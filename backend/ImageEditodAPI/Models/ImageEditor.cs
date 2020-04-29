using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using System.ComponentModel;
using System.IO;
using DocumentFormat.OpenXml.InkML;
using System.Drawing.Drawing2D;
using System.Globalization;
using System.Drawing.Imaging;

namespace ImageEditodAPI.Models
{
    public class ImageEditor
    {
        //TODO: 
        //1. Crop method
        //2. Rotate method
        //3. ChangeForm method
        //4. WriteText method

        public static byte[] Crop(byte[] image, int startX, int startY, int stopX, int stopY)
        {
            Bitmap bitmap = BytesToBitmap(image);

            Rectangle cropArea = new Rectangle
                (
                    new Point(startX, startY),
                    new Size(stopX - startX, stopY - startY)
                );

            byte[] result = BitmapToPngBytes(bitmap.Clone(cropArea, bitmap.PixelFormat));
            return result;
        }

        public static byte[] Rotate(byte[] image, double angle)
        {
            Bitmap bitmap = BytesToBitmap(image);

            Bitmap rotatedImage = new Bitmap(bitmap.Width, bitmap.Height);
            using (Graphics g = Graphics.FromImage(rotatedImage))
            {
                // Set the rotation point to the center in the matrix
                g.TranslateTransform(bitmap.Width / 2, bitmap.Height / 2);
                // Rotate
                g.RotateTransform((float)angle);
                // Restore rotation point in the matrix
                g.TranslateTransform(-bitmap.Width / 2, -bitmap.Height / 2);
                // Draw the image on the bitmap
                g.DrawImage(bitmap, new Point(0, 0));
            }


            byte[] result = BitmapToPngBytes(rotatedImage);

            return result;
        }

        public static byte[] ChangeForm(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);
            byte[] result = BitmapToPngBytes(bitmap);

            return result;
        }

        public static byte[] WriteText(byte[] image, string text, int startX, int startY, int stopX, int stopY, string hexColor, string font, string fontSize)
        {
            Bitmap bitmap = BytesToBitmap(image);

            Rectangle textArea = new Rectangle
                (
                    new Point(startX, startY),
                    new Size(stopX - startX, stopY - startY)
                );

            Graphics graphics = Graphics.FromImage(bitmap);

            int a = 1;
            int r = int.Parse(hexColor.Substring(1, 2), NumberStyles.HexNumber);
            int g = int.Parse(hexColor.Substring(3, 2), NumberStyles.HexNumber);
            int b = int.Parse(hexColor.Substring(5, 2), NumberStyles.HexNumber);

            var brush = new SolidBrush(Color.FromArgb(a, r, g, b));


            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphics.DrawString(text, new Font(font, float.Parse(fontSize, CultureInfo.InvariantCulture.NumberFormat)), Brushes.Black, textArea);

            graphics.Flush();

            byte[] result = BitmapToPngBytes(bitmap);

            return result;
        }

        public unsafe static byte[] Blur(byte[] image, Int32 blurSize)
        {
            Bitmap bitmap = BytesToBitmap(image);

            Bitmap blurred = new Bitmap(bitmap.Width, bitmap.Height);

            Rectangle rectangle = new Rectangle(0, 0, bitmap.Width, bitmap.Height);

            // make an exact copy of the bitmap provided
            using (Graphics graphics = Graphics.FromImage(blurred))
                graphics.DrawImage(bitmap, new Rectangle(0, 0, bitmap.Width, bitmap.Height),
                    new Rectangle(0, 0, bitmap.Width, bitmap.Height), GraphicsUnit.Pixel);

            // Lock the bitmap's bits
            BitmapData blurredData = blurred.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadWrite, blurred.PixelFormat);

            // Get bits per pixel for current PixelFormat
            int bitsPerPixel = Image.GetPixelFormatSize(blurred.PixelFormat);

            // Get pointer to first line
            byte* scan0 = (byte*)blurredData.Scan0.ToPointer();

            // look at every pixel in the blur rectangle
            for (int xx = rectangle.X; xx < rectangle.X + rectangle.Width; xx++)
            {
                for (int yy = rectangle.Y; yy < rectangle.Y + rectangle.Height; yy++)
                {
                    int avgR = 0, avgG = 0, avgB = 0;
                    int blurPixelCount = 0;

                    // average the color of the red, green and blue for each pixel in the
                    // blur size while making sure you don't go outside the image bounds
                    for (int x = xx; (x < xx + blurSize && x < bitmap.Width); x++)
                    {
                        for (int y = yy; (y < yy + blurSize && y < bitmap.Height); y++)
                        {
                            // Get pointer to RGB
                            byte* data = scan0 + y * blurredData.Stride + x * bitsPerPixel / 8;

                            avgB += data[0]; // Blue
                            avgG += data[1]; // Green
                            avgR += data[2]; // Red

                            blurPixelCount++;
                        }
                    }

                    avgR = avgR / blurPixelCount;
                    avgG = avgG / blurPixelCount;
                    avgB = avgB / blurPixelCount;

                    // now that we know the average for the blur size, set each pixel to that color
                    for (int x = xx; x < xx + blurSize && x < bitmap.Width && x < rectangle.Width; x++)
                    {
                        for (int y = yy; y < yy + blurSize && y < bitmap.Height && y < rectangle.Height; y++)
                        {
                            // Get pointer to RGB
                            byte* data = scan0 + y * blurredData.Stride + x * bitsPerPixel / 8;

                            // Change values
                            data[0] = (byte)avgB;
                            data[1] = (byte)avgG;
                            data[2] = (byte)avgR;
                        }
                    }
                }
            }

            // Unlock the bits
            blurred.UnlockBits(blurredData);

            byte[] result = BitmapToPngBytes(blurred);
            return result;
        }

        public static byte[] Discolor(byte[] image, bool isSepia)
        {
            if (isSepia)
                return sepia(image);
            return blackWhite(image);
        }

        private static byte[] sepia(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);

            //get image dimension
            int width = bitmap.Width;
            int height = bitmap.Height;

            //color of pixel
            Color p;

            //sepia
            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    //get pixel value
                    p = bitmap.GetPixel(x, y);

                    //extract pixel component ARGB
                    int a = p.A;
                    int r = p.R;
                    int g = p.G;
                    int b = p.B;

                    //calculate temp value
                    int tr = (int)(0.393 * r + 0.769 * g + 0.189 * b);
                    int tg = (int)(0.349 * r + 0.686 * g + 0.168 * b);
                    int tb = (int)(0.272 * r + 0.534 * g + 0.131 * b);

                    //set new RGB value
                    if (tr > 255)
                    {
                        r = 255;
                    }
                    else
                    {
                        r = tr;
                    }

                    if (tg > 255)
                    {
                        g = 255;
                    }
                    else
                    {
                        g = tg;
                    }

                    if (tb > 255)
                    {
                        b = 255;
                    }
                    else
                    {
                        b = tb;
                    }

                    //set the new RGB value in image pixel
                    bitmap.SetPixel(x, y, Color.FromArgb(a, r, g, b));
                }
            }

            byte[] result = BitmapToPngBytes(bitmap);
            return result;
        }

        private static byte[] blackWhite(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);

            int rgb;
            Color c;

            for (int y = 0; y < bitmap.Height; y++)
                for (int x = 0; x < bitmap.Width; x++)
                {
                    c = bitmap.GetPixel(x, y);
                    rgb = (int)Math.Round(.299 * c.R + .587 * c.G + .114 * c.B);
                    bitmap.SetPixel(x, y, Color.FromArgb(rgb, rgb, rgb));
                }

            byte[] result = BitmapToPngBytes(bitmap);
            return result;
        }

        public static byte[] ConvertPngToJpeg(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);
            byte[] result = BitmapToPngBytes(bitmap);

            return result;
        }

        private static Bitmap BytesToBitmap(byte[] bytes)
        {
            Image img = Image.FromStream(new MemoryStream(bytes));
            return (Bitmap)img;
        }

        public static byte[] BitmapToPngBytes(Bitmap bitmap)
        {
            var bytes = Array.Empty<byte>();
            using (var stream = new MemoryStream())
            {
                bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                bytes = stream.ToArray();
            }
            return bytes;
        }
    }
}

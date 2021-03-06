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

        public static byte[] Crop(byte[] image, string relation, int startX, int startY, int stopX, int stopY)
        {
            Bitmap bitmap = BytesToBitmap(image);

            Rectangle cropArea = new Rectangle
                (
                    new Point(startX, startY),
                    new Size(stopX - startX, stopY - startY)
                );

            if (relation == "16:9")
            {
                if ((double)bitmap.Width/(double)bitmap.Height < 16.0/9.0)
                    cropArea = new Rectangle(0, 0, bitmap.Width, 9 * bitmap.Width / 16);
                else
                    cropArea = new Rectangle(0, 0, 16 * bitmap.Height / 9, bitmap.Height);
            }
            else if (relation == "4:3")
            {
                if ((double)bitmap.Width / (double)bitmap.Height < 4.0 / 3.0)
                    cropArea = new Rectangle(0, 0, bitmap.Width, 3 * bitmap.Width / 4);
                else
                    cropArea = new Rectangle(0, 0, 4 * bitmap.Height / 3, bitmap.Height);
            }
            else if (relation == "3:2")
            {
                if ((double)bitmap.Width / (double)bitmap.Height < 3.0 / 2.0)
                    cropArea = new Rectangle(0, 0, bitmap.Width, 2 * bitmap.Width / 3);
                else
                    cropArea = new Rectangle(0, 0, 3 * bitmap.Height / 2, bitmap.Height);
            }
            else if (relation == "1:1")
            {
                if (bitmap.Width < bitmap.Height)
                    cropArea = new Rectangle(0, 0, bitmap.Width, bitmap.Width);
                else
                    cropArea = new Rectangle(0, 0, bitmap.Height, bitmap.Height);
            }


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

        public static byte[] WriteText(byte[] image, string text, bool isBottom, string color, string font = "Times New Roman", int fontSize = 20)
        {

            Bitmap bitmap = BytesToBitmap(image);
            Rectangle rect1 = new Rectangle(0, 0, bitmap.Width, 400);
            if (isBottom)
            {
                rect1 = new Rectangle(0, bitmap.Height - 400, bitmap.Width, 200);
            }

            StringFormat format = new StringFormat();
            format.LineAlignment = StringAlignment.Center;
            format.Alignment = StringAlignment.Center;

            var brush = Brushes.White;
            if (color == "red")
                brush = Brushes.Red;
            else if (color == "yellow")
                brush = Brushes.Yellow;
            else if (color == "green")
                brush = Brushes.Green;


            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                using (Font arialFont = new Font("Arial", 100))
                {
                    graphics.DrawString(text, arialFont, brush, rect1, format);
                }
            }

            byte[] result = BitmapToPngBytes(bitmap);

            return result;
        }

        public unsafe static byte[] Blur(byte[] image, int blurSize)
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

        public static byte[] ConvertToJpeg(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);
            byte[] result = BitmapToJpegBytes(bitmap);

            return result;
        }

        public static byte[] ConvertToPng(byte[] image)
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

        public static byte[] BitmapToJpegBytes(Bitmap bitmap)
        {
            var bytes = Array.Empty<byte>();
            using (var stream = new MemoryStream())
            {
                bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                bytes = stream.ToArray();
            }
            return bytes;
        }
    }
}

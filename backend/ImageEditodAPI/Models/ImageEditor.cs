﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using System.ComponentModel;
using System.IO;
using DocumentFormat.OpenXml.InkML;
using System.Drawing.Drawing2D;
using System.Globalization;

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

            byte[] result = BitmapToBytes(bitmap.Clone(cropArea, bitmap.PixelFormat));
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


            byte[] result = BitmapToBytes(rotatedImage);

            return result;
        }

        public static byte[] ChangeForm(byte[] image)
        {
            Bitmap bitmap = BytesToBitmap(image);
            byte[] result = BitmapToBytes(bitmap);

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
            int r = int.Parse(hexColor.Substring(0, 2), NumberStyles.HexNumber);
            int g = int.Parse(hexColor.Substring(2, 2), NumberStyles.HexNumber);
            int b = int.Parse(hexColor.Substring(4, 2), NumberStyles.HexNumber);

            var brush = new SolidBrush(Color.FromArgb(a, r, g, b));


            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphics.DrawString(text, new Font(font, float.Parse(fontSize, CultureInfo.InvariantCulture.NumberFormat)), Brushes.Black, textArea);

            graphics.Flush();

            byte[] result = BitmapToBytes(bitmap);

            return result;
        }

        private static Bitmap BytesToBitmap(byte[] bytes)
        {
            Image img = Image.FromStream(new MemoryStream(bytes));
            return (Bitmap)img;
        }

        public static byte[] BitmapToBytes(Bitmap bitmap)
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

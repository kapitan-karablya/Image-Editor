using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ImageEditodAPI.Models;
using System.Text;
using System.Data;
using Newtonsoft.Json;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using System.Drawing;

namespace ImageEditodAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class EditImageController : ControllerBase
    {
        private readonly ILogger<EditImageController> _logger;
        private SessionContext db;

        public EditImageController(SessionContext context, ILogger<EditImageController> logger)
        {
            _logger = logger;
            db = context;
        }

        private byte[] getBytesFromBody(Stream body)
        {
            using (var reader = new StreamReader(Request.Body))
            {
                return Convert.FromBase64String(reader.ReadToEndAsync().Result);
            }
        }

        private int getSessionId()
        {
            if (HttpContext.Session.Keys.Contains("id"))
            {
                return Int32.Parse(HttpContext.Session.GetString("id"));
            }
            else
            {
                HttpContext.Session.SetString("id", HttpContext.Session.Id.GetHashCode().ToString());
                return Int32.Parse(HttpContext.Session.GetString("id"));
            }
        }

        private Session getSession()
        {
            return db.Sessions.FirstOrDefault(item => item.SessionId == getSessionId());
        }

        private byte[] getImage()
        {
            var session = getSession();
            if (session == null)
            {
                return null;
            }
            return Convert.FromBase64String(JsonConvert.DeserializeObject<List<string>>(session.History)[session.Hui]);
        }

        private void putImage(byte[] image)
        {
            var session = getSession();
            var base64 = Convert.ToBase64String(image);
            session.CurrentImage = base64;
            var history = JsonConvert.DeserializeObject<List<string>>(session.History);
            history.RemoveRange(session.Hui + 1, history.Count - session.Hui - 1);
            history.Add(base64);
            session.Hui++;
            session.History = JsonConvert.SerializeObject(history.ToArray());
            db.Sessions.Update(session);
            db.SaveChangesAsync();
        }

        [HttpGet]
        [Route("undo")]
        public IActionResult Undo()
        {
            var session = getSession();
            if (session == null)
            {
                return StatusCode(404);
            }
            if (session.Hui != 0)
                session.Hui -= 1;
            var history = JsonConvert.DeserializeObject<List<string>>(session.History);
            session.CurrentImage = history[session.Hui];
            db.Sessions.Update(session);
            db.SaveChangesAsync();

            return Content(session.CurrentImage);
        }

        [HttpGet]
        [Route("redo")]
        public IActionResult Redo()
        {
            var session = getSession();
            if (session == null)
            {
                return StatusCode(404);
            }

            var history = JsonConvert.DeserializeObject<List<string>>(session.History);
            if (session.Hui != history.Count - 1)
                session.Hui += 1;
            session.CurrentImage = history[session.Hui];
            db.Sessions.Update(session);
            db.SaveChangesAsync();

            return Content(session.CurrentImage);
        }

        [HttpPut]
        [Route("upload")]
        public IActionResult Upload()
        {
            var body = getBytesFromBody(Request.Body);
            var id = getSessionId();
            var session = new Session() { SessionId = id, CurrentImage = Convert.ToBase64String(body), History = JsonConvert.SerializeObject(new string[] { Convert.ToBase64String(body) }), Hui = 0 };
            if (db.Sessions.Any(item => item.SessionId == id))
            {
                db.Sessions.Remove(db.Sessions.FirstOrDefault(item => item.SessionId == id));
            }
            db.Sessions.Add(session);
            db.SaveChangesAsync();
            return Content("Ok");
        }

        [HttpGet]
        [Route("download")]
        public IActionResult Download()
        {
            var session = getSession();
            if (session == null)
            {
                return StatusCode(404);
            }
            return Content(session.CurrentImage);
        }


        [HttpGet]
        [Route("Crop")]
        public IActionResult Crop(int startX, int startY, int stopX, int stopY)
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            byte[] result = ImageEditor.Crop(body, startX, startY, stopX, stopY);

            putImage(result);

            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("Rotate")]
        public IActionResult Rotate(double angle)
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            byte[] result = ImageEditor.Rotate(body, angle);
            putImage(result);

            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("ChangeForm")]
        public IActionResult ChangeForm()
        {
            return Content("Kek!");
        }

        [HttpGet]
        [Route("WriteText")]
        public IActionResult WriteText(string text, int startX, int startY, int stopX, int stopY, string hexColor, string font, string fontSize)
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            var result = ImageEditor.WriteText(body, text, startX, startY, stopX, stopY, hexColor, font, fontSize);
            putImage(result);
            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("blur")]
        public IActionResult Blur(int blurSize)
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            var result = ImageEditor.Blur(body, blurSize);
            putImage(result);
            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("discolor")]
        public IActionResult Discolor(bool isSepia)
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            var result = ImageEditor.Discolor(body, isSepia);
            putImage(result);
            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("getjpeg")]
        public IActionResult ConvertToJpeg()
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            var result = ImageEditor.ConvertToJpeg(body);
            putImage(result);
            return Content(Convert.ToBase64String(result));
        }

        [HttpGet]
        [Route("getpng")]
        public IActionResult ConvertToPng()
        {
            var body = getImage();
            if (body == null)
            {
                return StatusCode(404);
            }

            var result = ImageEditor.ConvertToPng(body);
            putImage(result);
            return Content(Convert.ToBase64String(result));
        }
    }
}
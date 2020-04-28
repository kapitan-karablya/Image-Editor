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

namespace ImageEditodAPI.Controllers
{
    [ApiController]
    [Route("Edit")]
    public class EditImageController : ControllerBase
    {
        private readonly ILogger<EditImageController> _logger;

        private byte[] getBytesFromBody(Stream body)
        {
            using (var reader = new StreamReader(Request.Body))
            {
                return Convert.FromBase64String(reader.ReadToEndAsync().Result);
            }
        }

        public EditImageController(ILogger<EditImageController> logger)
        {
            _logger = logger;
        }

        [HttpPut]
        [Route("Crop")]
        public IActionResult Crop(int startX, int startY, int stopX, int stopY)
        {
            var body = getBytesFromBody(Request.Body);

            byte[] result = ImageEditor.Crop(body, startX, startY, stopX, stopY);
            return Content(Convert.ToBase64String(result));
        }

        [Route("Rotate")]
        public IActionResult Rotate(double angle)
        {
            byte[] body = getBytesFromBody(Request.Body);

            byte[] result = ImageEditor.Rotate(body, angle);
            return Content(Convert.ToBase64String(result));
        }

        [Route("ChangeForm")]
        public IActionResult ChangeForm()
        {
            return Content("Kek!");
        }

        [Route("WriteText")]
        public IActionResult WriteText()
        {
            return Content("Kek!");
        }
    }
}
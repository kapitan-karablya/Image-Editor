using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ImageEditodAPI.Models
{
    public class Session
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SessionId { get; set; }
        public string CurrentImage { get; set; }
        public int Hui { get; set; }
        public string History { get; set; }
    }
}

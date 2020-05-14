using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ImageEditodAPI.Models
{
    public class SessionContext : DbContext
    {
        public DbSet<Session> Sessions { get; set; }
        public SessionContext(DbContextOptions<SessionContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}

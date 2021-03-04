using DiscordCloneReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscordCloneReact.Data
{
    public class DiscordCloneContext : DbContext
    {
        public DiscordCloneContext(DbContextOptions<DiscordCloneContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Server>().HasData(new Server { ServerId = 1, ServerName = "test" });
            modelBuilder.Entity<Channel>().HasData(
                new Channel { ChannelId = 1, ChannelName = "general", ServerId = 1 },
                new Channel { ChannelId = 2, ChannelName = "csgo", ServerId = 1 },
                new Channel { ChannelId = 3, ChannelName = "genshin", ServerId = 1 });
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, UserName = "Tom" },
                new User { UserId = 2, UserName = "Jim" });
            modelBuilder.Entity<ServerMember>().HasData(
                new ServerMember { ServerMemberId = 1, ServerId = 1, UserId = 1 },
                new ServerMember { ServerMemberId = 2, ServerId = 1, UserId = 2 });
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //    => optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");

        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Server> Servers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ServerMember> ServerMembers { get; set; }

    }
}

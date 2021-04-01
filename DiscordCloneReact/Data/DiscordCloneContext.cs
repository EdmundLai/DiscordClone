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
        }

        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Server> Servers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ServerMember> ServerMembers { get; set; }

    }
}

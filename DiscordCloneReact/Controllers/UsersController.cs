using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace DiscordCloneReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;

        public UsersController(DiscordCloneContext discordCloneContext)
        {
            this.discordCloneContext = discordCloneContext;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return discordCloneContext.Users.ToList();
        }

        [HttpGet("userByUserId")]
        async public Task<User> GetUserByUserIdAsync(int userId)
        {
            return await discordCloneContext.Users.FindAsync(userId);
        }

        [HttpGet("userByUserName")]
        public User GetUserByUserName(string userName)
        {
            return discordCloneContext.Users.Where(u => u.UserName == userName).FirstOrDefault();
        }

        [HttpGet("userExists")]
        public bool CheckUserExists(string userName)
        {
            var existingUser = discordCloneContext.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (existingUser != null)
            {
                return true;
            }
            return false;
        }

        // need to hash password before adding to database
        // uses bcrypt for password hashing
        [HttpPost("addUser")]
        async public Task<bool> AddUser(string userName, string password)
        {
            if (CheckUserExists(userName))
            {
                return false;
            }

            string passwordHash = BC.HashPassword(password);

            var newUser = new User { UserName = userName, UserPassword = passwordHash };
            discordCloneContext.Users.Add(newUser);
            await discordCloneContext.SaveChangesAsync();
            return true;
        }

        [HttpGet("verifyUser")]
        public bool VerifyUser(string userName, string password)
        {
            var user = GetUserByUserName(userName);

            return user != null && BC.Verify(password, user.UserPassword);
        }
    }
}

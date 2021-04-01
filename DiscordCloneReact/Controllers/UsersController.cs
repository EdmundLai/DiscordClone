using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace DiscordCloneReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly DiscordCloneContext discordCloneContext;
        private readonly ILogger<UsersController> _logger;

        public UsersController(DiscordCloneContext discordCloneContext, ILogger<UsersController> logger)
        {
            _logger = logger;
            this.discordCloneContext = discordCloneContext;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return discordCloneContext.Users.ToList();
        }

        [HttpGet("userByUserId")]
        async public Task<User> GetUserByUserIdAsync([FromQuery] int userId)
        {
            return await discordCloneContext.Users.FindAsync(userId);
        }

        [HttpGet("userByUserName")]
        public User GetUserByUserName([FromQuery] string userName)
        {
            return discordCloneContext.Users.Where(u => u.UserName == userName).FirstOrDefault();
        }

        [HttpGet("userExists")]
        public bool CheckUserExists([FromQuery] string userName)
        {
            try
            {
                var existingUser = discordCloneContext.Users.Where(u => u.UserName == userName).FirstOrDefault();

                if (existingUser != null)
                {
                    return true;
                }
                return false;
            } catch(Exception e)
            {
                _logger.LogError(e.Message);
                _logger.LogError(e.InnerException.ToString());
            }

            return false;
            
        }

        // need to hash password before adding to database
        // uses bcrypt for password hashing
        [HttpPost("addUser")]
        async public Task<bool> AddUser([FromQuery] string userName, [FromQuery] string password)
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
        public bool VerifyUser([FromQuery] string userName, [FromQuery] string password)
        {
            var user = GetUserByUserName(userName);

            return user != null && BC.Verify(password, user.UserPassword);
        }
    }
}

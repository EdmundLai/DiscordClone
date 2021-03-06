using DiscordCloneReact.Data;
using DiscordCloneReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        async public Task<IEnumerable<User>> Get(int? userId)
        {
            if (userId.HasValue)
            {
                User user = await discordCloneContext.Users.FindAsync(userId);
                var userList = new List<User>();
                userList.Add(user);
                return userList;
            }

            return discordCloneContext.Users.ToList();
        }
        
    }
}

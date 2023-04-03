using Kanoon.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Kanoon.Common.Common;

namespace Kanoon.Controllers
{
    [Route("TimeSheetApi")]
    [ApiController]
    public class TimeSheetApiController : ControllerBase
    {
        public int currentyear = 100;
        private readonly AppDbContext _appDbContext;

        public TimeSheetApiController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        #region Login

        public class loginArg
        {


            public string nationalCode { set; get; }


        }

        [HttpPost("login")]
        public dynamic login([FromForm] loginArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var user = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Password == arg.nationalCode);
                //string[] testDays = new string[12];
                if (user != null)
                {

                    user.IsActive = true;
                    user.LoginDate = DateTime.Now;


                    _appDbContext.tblTimeSheetUser.Update(user);
                    _appDbContext.SaveChanges();
                    resp.Data = new
                    {
                        success = 1,
                        userId = user.Id,
                        Name = user.Name,
                        Mobile = user.Mobile,
                        RoleId = user.RoleId,


                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
                        msg = "کاربر با این مشخصات وجود ندارد.",

                    };

                }

            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1
                };
            }
            return new JsonResult(resp);
        }
        #endregion
    }
}

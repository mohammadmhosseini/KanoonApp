using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanoon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TimeSheetApiController : ControllerBase
    {
        #region Login
        [Route("login")]
        [HttpPost]
        public dynamic login([FromBody] loginArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var user = new App().tblTimeSheetUser.FirstOrDefault(a => a.Password == arg.nationalCode);
                //string[] testDays = new string[12];
                if (user != null)
                {

                    user.isActive = true;
                    user.LoginDate = DateTime.Now;


                    BL<tblTimeSheetUser>.Update(user);
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
            return Json(resp);
        }
        #endregion
    }
}

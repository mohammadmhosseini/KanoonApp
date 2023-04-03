using Kanoon.Data;
using Kanoon.Models;
using Kanoon.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

                    user.isActive = true;
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

        #region setTimeSheet

        public class getTimeArg
        {
            public int userId { set; get; }

        }

        [HttpPost("getTime")]
        //[Authorize]
        public dynamic getTime([FromBody] getTimeArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
                var user = _appDbContext.tblTimeSheetUser.FirstOrDefault(p => p.Id == arg.userId);


                if (lastTime != null)
                {
                    resp.Data = new
                    {
                        success = 1,
                        startWorkDate = lastTime.StartWorkDate,
                        nowTime = DateTime.Now,
                        HeadRoleId = user.HeadRoleId,
                        lastDuration = DateTime.Now - lastTime.StartWorkDate,
                        notFinished = true,


                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
                        HeadRoleId = user.HeadRoleId,
                        notFinished = false,


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

        public class setStartTimeArg
        {
            public int userId { set; get; }
            public int workId { set; get; }
            public string startDesctiption { set; get; }
        }

        [HttpPost("setStartTime")]
        public dynamic setStartTime([FromBody] setStartTimeArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
                var isValid = _appDbContext.tblTimeSheetUser.FirstOrDefault(p => p.Id == arg.userId).isActive;
                if (lastTime == null)
                {
                    if (isValid == true)
                    {
                        var newTime = new tblTimeSheetUserWork()
                        {
                            UserId = arg.userId,
                            StartWorkDate = DateTime.Now,
                            StartWorkDescription = arg.startDesctiption,
                            PersianDate = PersianDateTime.ToPersianDate(),
                            workId = arg.workId,

                        };

                        _appDbContext.tblTimeSheetUserWork.Add(newTime);
                        _appDbContext.SaveChanges();

                        resp.Data = new
                        {
                            success = 1,

                            Message = "شروع کار شما با موفقیت ثبت شد.",
                        };
                    }
                    else
                    {
                        resp.Data = new
                        {
                            success = 1,
                            Message = "شما از سوی مدیر بلاک شده‌اید!",


                        };
                    }


                }
                else
                {
                    resp.Data = new
                    {
                        success = 1,
                        Message = "کار قبلی شما به پایان نرسیده است!",

                    };
                }
            }
            catch (Exception ex)
            {
                resp.Status = -1;
                resp.Message = ex.Message;
            }

            return new JsonResult(resp);
        }

        public class setEndTimeArg
        {
            public int userId { set; get; }

            public string EndDesctiption { set; get; }
        }

        [HttpPost("setEndTime")]
        public dynamic setEndTime([FromBody] setEndTimeArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);

                if (lastTime != null)
                {
                    var finishPersianDate = PersianDateTime.ToPersianDate();

                    if (lastTime.PersianDate != finishPersianDate)
                    {
                        var today = DateTime.Now;
                        var yesterDay = DateTime.Now.AddDays(-1);
                        var yesterDayEndDate = new DateTime(yesterDay.Year, yesterDay.Month, yesterDay.Day, 23, 59, 59);
                        var todayStartDate = new DateTime(today.Year, today.Month, today.Day, 0, 0, 0);
                        var lastStart = lastTime.StartWorkDate.To<DateTime>(DateTime.Now);
                        var diffMin = yesterDayEndDate.Subtract(lastStart).TotalMinutes;
                        lastTime.totalMinuetsWorked = diffMin.To<int>(0);
                        lastTime.EndWorkDate = yesterDayEndDate;
                        lastTime.EndWorkDescription = arg.EndDesctiption;
                        lastTime.isFinished = true;

                        _appDbContext.tblTimeSheetUserWork.Update(lastTime);

                        var diff2 = DateTime.Now.Subtract(todayStartDate).TotalMinutes;
                        var newTime = new tblTimeSheetUserWork()
                        {
                            UserId = arg.userId,
                            StartWorkDate = todayStartDate,
                            StartWorkDescription = lastTime.StartWorkDescription,
                            PersianDate = PersianDateTime.ToPersianDate(),
                            EndWorkDate = DateTime.Now,
                            EndWorkDescription = arg.EndDesctiption,
                            isFinished = true,
                            totalMinuetsWorked = diff2.To<int>(0),



                        };
                        _appDbContext.tblTimeSheetUserWork.Add(newTime);

                    }
                    else
                    {
                        var lastStart = lastTime.StartWorkDate.To<DateTime>(DateTime.Now);

                        var diffMin = DateTime.Now.Subtract(lastStart).TotalMinutes;
                        lastTime.totalMinuetsWorked = diffMin.To<int>(0);
                        lastTime.EndWorkDate = DateTime.Now;
                        lastTime.EndWorkDescription = arg.EndDesctiption;
                        lastTime.isFinished = true;



                        _appDbContext.tblTimeSheetUserWork.Update(lastTime);
                        resp.Data = new
                        {
                            success = 1,
                            finishTime = DateTime.Now,

                        };
                    }


                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,


                    };
                }

                _appDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                resp.Status = -1;
                resp.Message = ex.Message;
            }

            return new JsonResult(resp);
        }

        public class startNewWorkArg
        {
            public int userId { set; get; }
            public int workId { set; get; }

        }

        [HttpPost("startNewWork")]
        //[Authorize]
        public async Task<dynamic> startNewWork([FromBody] startNewWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var currentWork = _appDbContext.tblTimeSheetUserWorkTitle.FirstOrDefault(p => p.Id == arg.workId && p.IsStarted == null);
                currentWork.IsFinished = false;
                currentWork.StartDate = DateTime.Now;
                currentWork.IsStarted = true;
                currentWork.StartPersianDate = PersianDateTime.ToPersianDate();
                //currentWork.UserPredictFinishedDate = arg.finishPredict;
                _appDbContext.tblTimeSheetUserWorkTitle.Update(currentWork);
                await _appDbContext.SaveChangesAsync();


                resp.Data = new
                {
                    success = 1,
                    message = "شروع کار جدید شما با موفقیت ثبت شد."

                };




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

        public class finishCurrentWorkArg
        {
            public int userId { set; get; }
            public int currentWorkId { set; get; }
            public string comment { set; get; }
        }

        [HttpPost("finishCurrentWork")]
        //[Authorize]
        public async Task<dynamic> finishCurrentWork([FromBody] finishCurrentWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var currentWork = _appDbContext.tblTimeSheetUserWorkTitle.FirstOrDefault(p => p.Id == arg.currentWorkId && p.IsFinished == false);
                var hasWorkTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(p => p.workId == arg.currentWorkId && p.isFinished == true && p.EndWorkDate != null);
                if (hasWorkTime != null)
                {
                    currentWork.IsFinished = true;
                    currentWork.FinishedDate = DateTime.Now;
                    currentWork.FinishedPersianDate = PersianDateTime.ToPersianDate();
                    currentWork.UserComment = arg.comment;
                    currentWork.Days = DateTime.Now.Subtract(currentWork.StartDate.To<DateTime>(DateTime.Now)).TotalDays.To<Int32>();

                    _appDbContext.tblTimeSheetUserWorkTitle.Update(currentWork);
                    await _appDbContext.SaveChangesAsync();

                    resp.Data = new
                    {
                        success = 1,
                        message = "پایان کار فعلی شما با موفقیت ثبت شد."

                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 1,
                        message = "تاکنون برای این کار ساعت کاری ثبت نشده است!"

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

        public class getWorkListForUserArg
        {
            public int userId { set; get; }
            public int ProjectId { set; get; }
            public int DefinedWorkId { set; get; }
        }

        [HttpPost("getWorkListForUser")]
        //[Authorize]
        public dynamic getWorkListForUser([FromBody] getWorkListForUserArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = _appDbContext.tblTimeSheetUser.FirstOrDefault(p => p.Id == arg.userId && p.HeadRoleId == 1);
                var workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                where a.IsFinished == false && a.IsStarted == true && a.UserId == arg.userId && (arg.ProjectId != 0 ? a.ProjectId == arg.ProjectId : true) && (arg.DefinedWorkId != 0 ? a.DefinedWorkId == arg.DefinedWorkId : true) && a.isVerified == true
                                select new
                                {
                                    a,
                                    c.ProjectTitle,
                                    d.DefinedWorkTitle

                                }).ToList();

                var projectList = workList.DistinctBy(p => p.a.ProjectId).ToList();
                var definedWorkList = workList.DistinctBy(p => p.a.DefinedWorkId).ToList();

                resp.Data = new
                {
                    success = 1,
                    projectList,
                    definedWorkList,
                    workList

                };

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

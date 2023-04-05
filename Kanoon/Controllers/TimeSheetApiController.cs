using Kanoon.Data;
using Kanoon.Models;
using Kanoon.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public dynamic getTime([FromForm] getTimeArg arg)
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
        public dynamic setStartTime([FromForm] setStartTimeArg arg)
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
        public dynamic setEndTime([FromForm] setEndTimeArg arg)
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
        public async Task<dynamic> startNewWork([FromForm] startNewWorkArg arg)
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
        public async Task<dynamic> finishCurrentWork([FromForm] finishCurrentWorkArg arg)
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
        public dynamic getWorkListForUser([FromForm] getWorkListForUserArg arg)
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

        #region admin

        public class getPersianDatesArg
        {
            public int userId { set; get; }
        }

        [HttpPost("getPersianDates")]
        public dynamic getPersianDates([FromForm] getPersianDatesArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                DateTime todayDate = DateTime.Now;
                int TodayPersianDate = PersianDateTime.ToPersianDate(todayDate);
                var user = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId);
                int HeadRoleId;
                //var lastTime = new App().tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
                //var persianDates = new App().tblTimeSheetUserWork.DistinctBy(p => p.PersianDate).OrderBy(p => p.PersianDate).Select(p => p.PersianDate).ToList();
                if (user.RoleId == 31 || user.RoleId == 1 || user.RoleId == 111 || user.RoleId == 99)
                {
                    HeadRoleId = user.RoleId.To<int>(0);
                }
                else
                {
                    HeadRoleId = user.HeadRoleId.To<int>(0);
                }

                var persianDates = (from r in _appDbContext.tblTimeSheetUser
                                   join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
                                   where r.HeadRoleId == HeadRoleId
                                   select new
                                   {
                                       b.PersianDate

                                   }).ToList().DistinctBy(p => p.PersianDate).OrderByDescending(p => p.PersianDate);

                var years = (from r in _appDbContext.tblTimeSheetUser
                             join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
                             where r.HeadRoleId == HeadRoleId
                             select new
                             {
                                 b.PersianDate

                             }).ToList().DistinctBy(p => p.PersianDate / 10000).OrderByDescending(p => p.PersianDate / 10000);


                var mounts = (from r in _appDbContext.tblTimeSheetUser
                              join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
                              where r.HeadRoleId == HeadRoleId
                              select new
                              {
                                  b.PersianDate

                              }).ToList().DistinctBy(p => (p.PersianDate % 10000) / 100).OrderBy(p => (p.PersianDate % 10000) / 100);



                var days = (from r in _appDbContext.tblTimeSheetUser
                            join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
                            where r.HeadRoleId == HeadRoleId
                            select new
                            {
                                b.PersianDate
                            }).ToList().DistinctBy(p => p.PersianDate % 100).OrderBy(p => p.PersianDate % 100);

                List<int> this30Days = new List<int>();
                for (var i = 0; i < 10; i++)
                {

                    DateTime tdDate = DateTime.Now.AddDays(i);

                    int TPersianDate = PersianDateTime.ToPersianDate(tdDate);

                    this30Days.Add(TPersianDate);
                }
                int onMonthDay = 0;
                if ((TodayPersianDate % 100) > 25)
                {
                    onMonthDay = ((TodayPersianDate / 100) * 100) + 26;
                }
                else
                {
                    onMonthDay = (((TodayPersianDate / 100) - 1) * 100) + 26;
                }


                resp.Data = new
                {
                    success = 1,
                    TodayPersianDate,
                    persianDates,
                    years,
                    mounts,
                    days,
                    this30Days,
                    onMonthDay,
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

        public class userInfo
        {
            public int UserId { get; set; }
            public string Name { get; set; }
            public string Family { get; set; }
            public int Amount { get; set; }
            public int TotalAmount { get; set; }
            public string GroupName { get; set; }
            public int DayCount { get; set; }
            public int? TotalMinutes { get; set; }
            public int isOnline { get; set; }
            public int isActive { get; set; }
            public string DefinedWorkTitle { get; set; }
        }

        //public class getUsersArg
        //{
        //    public int userId { set; get; }
        //    public int FromPDate { set; get; }
        //    public int ToPDate { set; get; }

        //}

        //[HttpPost("getUsers")]
        //public dynamic getUsers([FromForm] getUsersArg arg)
        //{

        //    var resp = new AppResponse()
        //    {
        //        Status = 1
        //    };
        //    try
        //    {
        //        var admin = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId & (a.RoleId == 1 || a.RoleId == 111 || a.RoleId == 99));
        //        var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
        //        var persianDates = _appDbContext.tblTimeSheetUserWork.Where(a => a.UserId == arg.userId).DistinctBy(p => p.PersianDate).OrderByDescending(p => p.PersianDate).Select(p => p.PersianDate).ToList();

        //        var onlineUsers = (from r in _appDbContext.tblTimeSheetUser
        //                           join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
        //                           where b.EndWorkDate == null && r.HeadRoleId == admin.RoleId
        //                           select new
        //                           {
        //                               r.Name,
        //                               r.Family,
        //                               r.Id,

        //                           }).ToList();

        //        var userList = new List<userInfo>();
        //        var lastMountUserList = new List<userInfo>();

        //        var reportType = 1;
        //        var adminRoleId = 1;
        //        var startDate = arg.FromPDate;
        //        var endDate = arg.ToPDate;

        //        userList = _appDbContext.TimeSheetReports.FromSqlRaw("EXEC dbo.TimeSheetReport @ReportType = {0}, @AdminRoleId = {1}, @StartDate = {2}, @EndDate = {3}", reportType, adminRoleId, startDate, endDate).ToList();


        //        using (BLToolkit.Data.DbManager _db = new BLToolkit.Data.DbManager("KanoonApp"))
        //        {
        //            //string query = $"SELECT B.UserId,A.Amount,A.Name,A.Family,COUNT(DISTINCT B.PersianDate) AS DayCount,SUM(B.totalMinuetsWorked) AS TotalMinutes , CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END AS isActive FROM dbo.tblTimeSheetUser A JOIN dbo.tblTimeSheetUserWork B ON B.UserId = A.Id LEFT JOIN dbo.tblTimeSheetUserWork C ON C.UserId = A.Id AND C.EndWorkDate IS NULL AND A.HeadRoleId = '{admin.RoleId}' WHERE A.HeadRoleId = '{admin.RoleId}' AND B.PersianDate >= '{arg.FromPDate}' AND B.PersianDate <= '{arg.ToPDate}' GROUP BY CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END,B.UserId,A.Amount,A.Name,A.Family ORDER BY B.UserId";
        //            //string query = $"SELECT B.UserId,A.Amount,A.Name,A.Family,COUNT(DISTINCT B.PersianDate) AS DayCount,SUM(B.totalMinuetsWorked) AS TotalMinutes ,CASE WHEN B.UserId=2 AND SUM(B.totalMinuetsWorked)>198*60 THEN (198*60*30000 + (SUM(B.totalMinuetsWorked)-198*60)*20000)/60 WHEN B.UserId=2 AND SUM(B.totalMinuetsWorked)<=198*60 THEN SUM(B.totalMinuetsWorked)*30000/60 WHEN B.UserId=13 AND SUM(B.totalMinuetsWorked)>=150*60 THEN 150*A.Amount WHEN B.UserId=13 AND SUM(B.totalMinuetsWorked)<150*60 THEN SUM(B.totalMinuetsWorked)*A.Amount/60 ELSE A.Amount*SUM(B.totalMinuetsWorked)/60 END AS TotalAmount,CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END AS isActive FROM dbo.tblTimeSheetUser A JOIN dbo.tblTimeSheetUserWork B ON B.UserId = A.Id LEFT JOIN dbo.tblTimeSheetUserWork C ON C.UserId = A.Id AND C.EndWorkDate IS NULL AND A.HeadRoleId = '{admin.RoleId}' WHERE A.HeadRoleId = '{admin.RoleId}' AND B.PersianDate >= '{arg.FromPDate}'  AND B.PersianDate <= '{arg.ToPDate}' GROUP BY CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END,B.UserId,A.Amount,A.Name,A.Family ORDER BY B.UserId";
        //            string query = $"EXEC dbo.TimeSheetReport @ReportType = 1, @AdminRoleId = 1, @StartDate = '{arg.FromPDate}', @EndDate = '{arg.ToPDate}'";

        //            userList = _db.SetCommand(query).ExecuteList<userInfo>();
        //            _db.Dispose();
        //            _db.Close();

        //        }

        //        using (BLToolkit.Data.DbManager _db = new BLToolkit.Data.DbManager("KanoonApp"))
        //        {

        //            //string query = $"SELECT B.UserId,A.Amount,A.Name,A.Family,COUNT(DISTINCT B.PersianDate) AS DayCount,SUM(B.totalMinuetsWorked) AS TotalMinutes , CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END AS isActive FROM dbo.tblTimeSheetUser A JOIN dbo.tblTimeSheetUserWork B ON B.UserId = A.Id LEFT JOIN dbo.tblTimeSheetUserWork C ON C.UserId = A.Id AND C.EndWorkDate IS NULL AND A.HeadRoleId = '{admin.RoleId}' WHERE A.HeadRoleId = '{admin.RoleId}' AND B.PersianDate >= '{arg.FromPDate-100}' AND B.PersianDate <= '{arg.ToPDate-100}' GROUP BY CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END,B.UserId,A.Amount,A.Name,A.Family ORDER BY B.UserId";
        //            //string query = $"SELECT B.UserId,A.Amount,A.Name,A.Family,COUNT(DISTINCT B.PersianDate) AS DayCount,SUM(B.totalMinuetsWorked) AS TotalMinutes ,CASE WHEN B.UserId=2 AND SUM(B.totalMinuetsWorked)>198*60 THEN (198*60*30000 + (SUM(B.totalMinuetsWorked)-198*60)*20000)/60 WHEN B.UserId=2 AND SUM(B.totalMinuetsWorked)<=198*60 THEN SUM(B.totalMinuetsWorked)*30000/60 WHEN B.UserId=13 AND SUM(B.totalMinuetsWorked)>=150*60 THEN 150*A.Amount WHEN B.UserId=13 AND SUM(B.totalMinuetsWorked)<150*60 THEN SUM(B.totalMinuetsWorked)*A.Amount/60 ELSE A.Amount*SUM(B.totalMinuetsWorked)/60 END AS TotalAmount,CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END AS isActive FROM dbo.tblTimeSheetUser A JOIN dbo.tblTimeSheetUserWork B ON B.UserId = A.Id LEFT JOIN dbo.tblTimeSheetUserWork C ON C.UserId = A.Id AND C.EndWorkDate IS NULL AND A.HeadRoleId = '{admin.RoleId}' WHERE A.HeadRoleId = '{admin.RoleId}' AND B.PersianDate >= '{arg.FromPDate - 100}'  AND B.PersianDate <= '{arg.ToPDate - 100}' GROUP BY CASE WHEN C.Id IS NOT NULL THEN 1 ELSE 0 END,B.UserId,A.Amount,A.Name,A.Family ORDER BY B.UserId";
        //            string query = $"EXEC dbo.TimeSheetReport @ReportType = 1, @AdminRoleId = 1, @StartDate = '{arg.FromPDate - 100}', @EndDate = '{arg.ToPDate - 100}'";
        //            lastMountUserList = _db.SetCommand(query).ExecuteList<userInfo>();
        //            _db.Dispose();
        //            _db.Close();

        //        }
        //        //var allUsers = new App().tblTimeSheetUserWork.Where(a => a.UserId == arg.userId).DistinctBy(p => p.PersianDate).OrderBy(p => p.PersianDate).Select(p => p.PersianDate).ToList();


        //        if (admin != null)
        //        {
        //            resp.Data = new
        //            {
        //                success = 1,
        //                onlineUsers,
        //                userList,
        //                lastMountUserList
        //            };
        //        }
        //        else
        //        {
        //            resp.Data = new
        //            {
        //                success = 0,


        //            };

        //        }



        //    }
        //    catch (Exception)
        //    {
        //        resp.Data = new
        //        {
        //            success = -1
        //        };
        //    }
        //    return new JsonResult(resp);
        //}

        public class ActiveDeactiveUserArg
        {
            public int userId { set; get; }

        }

        [HttpPost("ActiveDeactiveUser")]
        public dynamic ActiveDeactiveUser([FromForm] ActiveDeactiveUserArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {


                var user = _appDbContext.tblTimeSheetUser.FirstOrDefault(p => p.Id == arg.userId);
                if (user != null)
                {
                    user.isActive = !user.isActive;
                    _appDbContext.tblTimeSheetUser.Update(user);
                    _appDbContext.SaveChanges();
                    resp.Data = new
                    {
                        success = 1,
                        Message = "با موفقیت اعمال شد."
                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = -1,
                        Message = "خطایی رخ داده است!"
                    };
                }



            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1,
                    Message = "خطایی رخ داده است!"
                };
            }
            return new JsonResult(resp);
        }

        public class userDay
        {
            public int? UserId { get; set; }
            public int? TotalMinutes { get; set; }
            public int? PersianDate { get; set; }

        }
        public class getUserDayTimesArg
        {
            public int userId { set; get; }
            public int FromPDate { set; get; }
            public int ToPDate { set; get; }
        }

        [HttpPost("getUserDayTimes")]
        public dynamic getUserDayTimes([FromForm] getUserDayTimesArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var userDates = new List<userDay>();

                var userId = arg.userId;
                var fromDate = arg.FromPDate;
                var toDate = arg.ToPDate;

                userDates = _appDbContext.tblTimeSheetUserWork
                                .Where(a => a.UserId == userId && a.PersianDate >= fromDate && a.PersianDate <= toDate)
                                .GroupBy(a => new { a.UserId, a.PersianDate })
                                .Select(g => new userDay
                                {
                                    UserId = g.Key.UserId,
                                    PersianDate = g.Key.PersianDate,
                                    TotalMinutes = g.Sum(a => a.totalMinuetsWorked)
                                })
                                .OrderBy(a => a.PersianDate)
                                .ToList();

                resp.Data = new
                {
                    success = 1,
                    userDates,
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

        public class getUsersOfWorkTitleArg
        {
            public int userId { set; get; }


        }

        [HttpPost("getUsersOfWorkTitle")]
        public dynamic getUsersOfWorkTitle([FromForm] getUsersOfWorkTitleArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var admin = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId & (a.RoleId == 1 || a.RoleId == 111 || a.RoleId == 31 || a.RoleId == 99));
                var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
                var persianDates = _appDbContext.tblTimeSheetUserWork.Where(a => a.UserId == arg.userId).DistinctBy(p => p.PersianDate).OrderByDescending(p => p.PersianDate).Select(p => p.PersianDate).ToList();

                var userList = _appDbContext.tblTimeSheetUser.Where(a => (a.RoleId == 2 || a.RoleId == 999) && a.HeadRoleId == admin.RoleId);

                if (admin != null)
                {
                    resp.Data = new
                    {
                        success = 1,
                        userList,
                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
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

        public class insertNewWorkArg
        {
            public int userId { set; get; }
            public bool isFromAdmin { set; get; }
            public int ProjectId { set; get; }
            public int DefinedWorkId { set; get; }
            public string NewWorkTitle { set; get; }
            public int finishPredict { set; get; }
        }

        [HttpPost("insertNewWork")]
        public dynamic insertNewWork([FromForm] insertNewWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var newWork = new tblTimeSheetUserWorkTitle()
                {
                    ProjectId = arg.ProjectId,
                    DefinedWorkId = arg.DefinedWorkId,
                    UserId = arg.userId,
                    InsertPersianDate = PersianDateTime.ToPersianDate(),
                    InsertDate = DateTime.Now,
                    WorkTitle = arg.NewWorkTitle,
                    IsFinished = false,
                    HeadPredictFinishedDate = arg.finishPredict,
                    isVerified = arg.isFromAdmin,

                };
                _appDbContext.tblTimeSheetUserWorkTitle.Add(newWork);
                _appDbContext.SaveChanges();

                resp.Data = new
                {
                    success = 1,
                    message = "کار جدید با موفقیت ثبت شد."

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

        public class getNotVerifiedWorkListArg
        {
            public int HeadRoleId { set; get; }


        }

        [HttpPost("getNotVerifiedWorkList")]
        public dynamic getNotVerifiedWorkList([FromForm] getNotVerifiedWorkListArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = "لیست کارهای تایید نشده";
                var workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                join b in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals b.Id
                                join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                join d in _appDbContext.tblTimeSheetUser on a.UserId equals d.Id
                                where a.isVerified == false
                                select new
                                {
                                    a.Id,
                                    a.InsertPersianDate,
                                    a.UserId,
                                    d.Name,
                                    d.Family,
                                    c.ProjectTitle,
                                    b.DefinedWorkTitle,
                                    a.WorkTitle,
                                    a.HeadPredictFinishedDate,

                                }).DistinctBy(a => a.Id).ToList();

                resp.Data = new
                {
                    success = 1,
                    workList,
                    userName,
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

        public class verifyNewWorkArg
        {
            public int workId { set; get; }

        }

        [HttpPost("verifyNewWork")]
        public dynamic verifyNewWork([FromForm] verifyNewWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var work = _appDbContext.tblTimeSheetUserWorkTitle.FirstOrDefault(p => p.Id == arg.workId);
                if (work != null)
                {
                    work.isVerified = !work.isVerified;
                    _appDbContext.tblTimeSheetUserWorkTitle.Update(work);
                    _appDbContext.SaveChanges();
                    resp.Data = new
                    {
                        success = 1,
                        message = "کار مورد نظر با موفقیت فعال شد."

                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 1,
                        message = "چنین کاری وجود ندارد!"

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

        public class deleteWorkTitleArg
        {
            public int workId { set; get; }

        }

        [HttpPost("deleteWorkTitle")]
        public dynamic deleteWorkTitle([FromForm] deleteWorkTitleArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var work = _appDbContext.tblTimeSheetUserWorkTitle.FirstOrDefault(p => p.Id == arg.workId);
                if (work != null)
                {
                    _appDbContext.tblTimeSheetUserWorkTitle.Remove(work);
                    _appDbContext.SaveChanges();
                    resp.Data = new
                    {
                        success = 1,
                        message = "کار مورد نظر با موفقیت حذف شد."

                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 1,
                        message = "چنین کاری وجود ندارد!"

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

        public class getUserWorkListArg
        {
            public int userId { set; get; }
            public int workType { set; get; }
            public int FromPDate { set; get; }
            public int ToPDate { set; get; }

        }

        [HttpPost("getUserWorkList")]
        public dynamic getUserWorkList([FromForm] getUserWorkListArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                if (arg.userId == 0)
                {
                    var userName = "لیست کار تمامی کاربران";
                    var workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join b in _appDbContext.tblTimeSheetUser on a.UserId equals b.Id
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.InsertPersianDate == arg.FromPDate && a.FinishedPersianDate == arg.ToPDate
                                    select new
                                    {
                                        userNames = b.Name + " " + b.Family,

                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle


                                    }).ToList();
                    if (arg.workType == 0)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join b in _appDbContext.tblTimeSheetUser on a.UserId equals b.Id
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.InsertPersianDate >= arg.FromPDate && a.InsertPersianDate <= arg.ToPDate && a.IsFinished == false && a.IsStarted == null
                                    select new
                                    {
                                        userNames = b.Name + " " + b.Family,
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    }).ToList();
                    }
                    else if (arg.workType == 1)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join b in _appDbContext.tblTimeSheetUser on a.UserId equals b.Id
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.StartPersianDate >= arg.FromPDate && a.StartPersianDate <= arg.ToPDate && a.IsFinished == false && a.IsStarted == true && a.isVerified == true
                                    select new
                                    {
                                        userNames = b.Name + " " + b.Family,
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    }).ToList();
                    }
                    else if (arg.workType == 2)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join b in _appDbContext.tblTimeSheetUser on a.UserId equals b.Id
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.FinishedPersianDate >= arg.FromPDate && a.FinishedPersianDate <= arg.ToPDate && a.IsFinished == true && a.isVerified == true
                                    select new
                                    {
                                        userNames = b.Name + " " + b.Family,
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    }).ToList();

                    }

                    var WorkList = workList.ToList();
                    resp.Data = new
                    {
                        success = 1,
                        WorkList,
                        userName,
                    };
                }
                else
                {
                    var userName = _appDbContext.tblTimeSheetUser.FirstOrDefault(p => p.Id == arg.userId && p.HeadRoleId == 1);
                    var workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.StartPersianDate >= arg.FromPDate && a.StartPersianDate <= arg.ToPDate && a.IsFinished == false && a.IsStarted == true && a.UserId == arg.userId && a.isVerified == true
                                    select new
                                    {
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    });
                    if (arg.workType == 0)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.InsertPersianDate >= arg.FromPDate && a.InsertPersianDate <= arg.ToPDate && a.IsFinished == false && a.IsStarted == null && a.UserId == arg.userId && a.isVerified == true
                                    select new
                                    {
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    });
                    }

                    else if (arg.workType == 1)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.IsFinished == false && a.IsStarted == true && a.UserId == arg.userId && a.StartPersianDate >= arg.FromPDate && a.StartPersianDate <= arg.ToPDate && a.isVerified == true
                                    select new
                                    {
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    });
                    }
                    else if (arg.workType == 2)
                    {
                        workList = (from a in _appDbContext.tblTimeSheetUserWorkTitle
                                    join c in _appDbContext.tblTimeSheetProject on a.ProjectId equals c.Id
                                    join d in _appDbContext.tblTimeSheetDefinedWork on a.DefinedWorkId equals d.Id
                                    where a.FinishedPersianDate >= arg.FromPDate && a.FinishedPersianDate <= arg.ToPDate && a.IsFinished == true && a.UserId == arg.userId && a.isVerified == true
                                    select new
                                    {
                                        a,
                                        c.ProjectTitle,
                                        d.DefinedWorkTitle

                                    });

                    }

                    var WorkList = workList.ToList();
                    resp.Data = new
                    {
                        success = 1,
                        WorkList,
                        userName,

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

        public class insertNewProjectArg
        {
            public int HeadRoleId { set; get; }
            public string NewProjectTitle { set; get; }
        }

        [HttpPost("insertNewProject")]
        public dynamic insertNewProject([FromForm] insertNewProjectArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var newWork = new tblTimeSheetProject()
                {
                    HeadRoleId = arg.HeadRoleId,
                    InsertPersianDate = PersianDateTime.ToPersianDate().ToString(),
                    InsertDate = DateTime.Now,
                    ProjectTitle = arg.NewProjectTitle,
                    IsActive = true,
                };
                _appDbContext.tblTimeSheetProject.Add(newWork);
                _appDbContext.SaveChanges();


                resp.Data = new
                {
                    success = 1,
                    message = "پروژه جدید با موفقیت ثبت شد."

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

        public class getProjectListArg
        {
            public int HeadRoleId { set; get; }


        }

        [HttpPost("getProjectList")]
        public dynamic getProjectList([FromForm] getProjectListArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = "لیست پروژها";
                var projectList = _appDbContext.tblTimeSheetProject.Where(p => p.HeadRoleId == arg.HeadRoleId).ToList();
                var activeProject = _appDbContext.tblTimeSheetProject.Where(p => p.HeadRoleId == arg.HeadRoleId && p.IsActive == true).ToList();

                resp.Data = new
                {
                    success = 1,
                    projectList,
                    activeProject,
                    userName,
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

        public class ActiveDeactiveProjectArg
        {
            public int projectId { set; get; }


        }

        [HttpPost("ActiveDeactiveProject")]
        public dynamic ActiveDeactiveProject([FromForm] ActiveDeactiveProjectArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = "لیست پروژها";
                var project = _appDbContext.tblTimeSheetProject.FirstOrDefault(p => p.Id == arg.projectId);
                if (project != null)
                {
                    project.IsActive = !project.IsActive;
                    _appDbContext.tblTimeSheetProject.Update(project);
                    _appDbContext.SaveChanges();
                }
                resp.Data = new
                {
                    success = 1,
                    Message = "با موفقیت اعمال شد."
                };


            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1,
                    Message = "خطایی رخ داده است!"
                };
            }
            return new JsonResult(resp);
        }

        public class EditProjectTitleArg
        {
            public int projectId { set; get; }
            public string projectTitle { set; get; }

        }

        [HttpPost("EditProjectTitle")]
        public dynamic EditProjectTitle([FromForm] EditProjectTitleArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {


                var project = _appDbContext.tblTimeSheetProject.FirstOrDefault(p => p.Id == arg.projectId);
                if (project != null)
                {
                    project.ProjectTitle = arg.projectTitle;
                    _appDbContext.tblTimeSheetProject.Update(project);
                    _appDbContext.SaveChanges();
                }
                resp.Data = new
                {
                    success = 1,
                    Message = "با موفقیت اعمال شد."
                };


            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1,
                    Message = "خطایی رخ داده است!"
                };
            }
            return new JsonResult(resp);
        }

        public class insertNewDefinedWorkArg
        {
            public int HeadRoleId { set; get; }
            public string NewDefinedWorkTitle { set; get; }
        }

        [HttpPost("insertNewDefinedWork")]
        public dynamic insertNewDefinedWork([FromForm] insertNewDefinedWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var newWork = new tblTimeSheetDefinedWork()
                {
                    HeadRoleId = arg.HeadRoleId,
                    InsertPersianDate = PersianDateTime.ToPersianDate().ToString(),
                    InsertDate = DateTime.Now,
                    DefinedWorkTitle = arg.NewDefinedWorkTitle,
                    IsActive = true,


                };
                _appDbContext.tblTimeSheetDefinedWork.Add(newWork);
                _appDbContext.SaveChanges();


                resp.Data = new
                {
                    success = 1,
                    message = "کار جدید با موفقیت ثبت شد."

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

        public class getDefinedWorkListArg
        {
            public int HeadRoleId { set; get; }


        }

        [HttpPost("getDefinedWorkList")]
        public dynamic getDefinedWorkList([FromForm] getDefinedWorkListArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = "لیست کارهای تعریف شده";
                var definedWorkList = _appDbContext.tblTimeSheetDefinedWork.Where(p => p.HeadRoleId == arg.HeadRoleId).ToList();
                var activedefinedWork = _appDbContext.tblTimeSheetDefinedWork.Where(p => p.HeadRoleId == arg.HeadRoleId && p.IsActive == true).ToList();

                resp.Data = new
                {
                    success = 1,
                    definedWorkList,
                    activedefinedWork,
                    userName,
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

        public class ActiveDeactiveDefinedWorkArg
        {
            public int definedWorkId { set; get; }


        }

        [HttpPost("ActiveDeactiveDefinedWork")]
        public dynamic ActiveDeactiveDefinedWork([FromForm] ActiveDeactiveDefinedWorkArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var userName = "لیست کارهای تعریف شده";
                var work = _appDbContext.tblTimeSheetDefinedWork.FirstOrDefault(p => p.Id == arg.definedWorkId);
                if (work != null)
                {
                    work.IsActive = !work.IsActive;
                    _appDbContext.tblTimeSheetDefinedWork.Update(work);
                    _appDbContext.SaveChanges();
                }
                resp.Data = new
                {
                    success = 1,
                    Message = "با موفقیت اعمال شد."
                };


            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1,
                    Message = "خطایی رخ داده است!"
                };
            }
            return new JsonResult(resp);
        }

        public class EditDefinedWorkTitleArg
        {
            public int definedWorkId { set; get; }
            public string definedWorkTitle { set; get; }

        }

        [HttpPost("EditDefinedWorkTitle")]
        public dynamic EditDefinedWorkTitle([FromForm] EditDefinedWorkTitleArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {


                var work = _appDbContext.tblTimeSheetDefinedWork.FirstOrDefault(p => p.Id == arg.definedWorkId);
                if (work != null)
                {
                    work.DefinedWorkTitle = arg.definedWorkTitle;
                    _appDbContext.tblTimeSheetDefinedWork.Update(work);
                    _appDbContext.SaveChanges();
                }
                resp.Data = new
                {
                    success = 1,
                    Message = "با موفقیت اعمال شد."
                };


            }
            catch (Exception)
            {
                resp.Data = new
                {
                    success = -1,
                    Message = "خطایی رخ داده است!"
                };
            }
            return new JsonResult(resp);
        }

        public class getUserTimesofDayArg
        {
            public int userId { set; get; }
            public int persianDate { set; get; }

        }

        [HttpPost("getUserTimesofDay")]
        public dynamic getUserTimesofDay([FromForm] getUserTimesofDayArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {

                var times = _appDbContext.tblTimeSheetUserWork.Where(a => a.UserId == arg.userId && a.PersianDate == arg.persianDate).ToList();

                //var mains = new CityKanoonDB().vGroupMain.Where(p => p.CurrentYear == 99 && p.MainCode < 5 && p.MainCode > 0).OrderByDescending(p => p.MainCode).Select(p => new
                //{
                //    p.MainCode,
                //    p.MainName
                //}).ToList();

                resp.Data = new
                {
                    success = 1,
                    times,
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

        //payroll panel
        public class getUsersOfPayrollArg
        {
            public int userId { set; get; }


        }

        [HttpPost("getUsersOfPayroll")]
        public dynamic getUsersOfPayroll([FromForm] getUsersOfPayrollArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var admin = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId & (a.RoleId == 1 || a.RoleId == 111 || a.RoleId == 31));

                var notInsertedUsers = _appDbContext.tblTimeSheetUser.Where(a => a.HeadRoleId == admin.RoleId && a.isActive == true && a.Amount == null);

                if (admin != null)
                {
                    resp.Data = new
                    {
                        success = 1,
                        notInsertedUsers,
                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
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

        public class insertUserPayrollArg
        {
            public int userId { set; get; }

            public int amount { set; get; }
        }

        [HttpPost("insertUserPayroll")]
        public dynamic insertUserPayroll([FromForm] insertUserPayrollArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var user = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId && a.Amount == null);

                if (user != null)
                {


                    user.Amount = arg.amount;

                    _appDbContext.tblTimeSheetUser.Update(user);
                    _appDbContext.SaveChanges();


                    resp.Data = new
                    {
                        success = 1,
                        message = "دستمزد کاربر با موفقیت ثبت شد.",
                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
                        message = "کاربر با چنین مشخصاتی وجود ندارد!",
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

        //azmoon group time sheet

        public class getCategoryArg
        {
            public int userId { set; get; }
        }

        [HttpPost("getCategory")]
        public dynamic getCategory([FromForm] getCategoryArg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var admin = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId & a.RoleId == 31);

                if (admin != null)
                {
                    var categoryList = _appDbContext.tblTimeSheetUser.Where(a => a.HeadRoleId == 31).DistinctBy(a => a.RoleId).Select(p => new
                    {
                        p.RoleId,
                        p.OfficeName,
                    }).ToList();

                    resp.Data = new
                    {
                        success = 1,
                        categoryList,
                    };

                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
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

        public class getUsers2Arg
        {
            public int userId { set; get; }
            public int userRoleId { set; get; }
            public int FromPDate { set; get; }
            public int ToPDate { set; get; }
        }

        [HttpPost("getUsers2")]
        public dynamic getUsers2([FromForm] getUsers2Arg arg)
        {

            var resp = new AppResponse()
            {
                Status = 1
            };
            try
            {
                var admin = _appDbContext.tblTimeSheetUser.FirstOrDefault(a => a.Id == arg.userId & a.RoleId == 31);

                var lastTime = _appDbContext.tblTimeSheetUserWork.FirstOrDefault(a => a.UserId == arg.userId && a.EndWorkDate == null);
                var persianDates = _appDbContext.tblTimeSheetUserWork.Where(a => a.UserId == arg.userId).DistinctBy(p => p.PersianDate).OrderBy(p => p.PersianDate).Select(p => p.PersianDate).ToList();

                var onlineUsers = (from r in _appDbContext.tblTimeSheetUser
                                   join b in _appDbContext.tblTimeSheetUserWork on r.Id equals b.UserId
                                   where b.EndWorkDate == null && r.HeadRoleId == 31
                                   select new
                                   {
                                       r.Name,
                                       r.Family,
                                       r.Id,
                                       r.GroupName

                                   }).ToList();

                var userList = new List<userInfo>();

                var userRoleId = arg.userRoleId;
                var fromDate = arg.FromPDate;
                var toDate = arg.ToPDate;

                var query = from user in _appDbContext.tblTimeSheetUser
                            join userWork in _appDbContext.tblTimeSheetUserWork on user.Id equals userWork.UserId
                            into userWorkJoin
                            from userWork in userWorkJoin.DefaultIfEmpty()
                            join activeUserWork in _appDbContext.tblTimeSheetUserWork
                            on new { userWork.UserId, userWork.EndWorkDate } equals new { activeUserWork.UserId, EndWorkDate = (DateTime?)null }
                            into activeUserWorkJoin
                            from activeUserWork in activeUserWorkJoin.DefaultIfEmpty()
                            where user.HeadRoleId == 31 && user.RoleId == userRoleId
                            && userWork.PersianDate >= fromDate && userWork.PersianDate <= toDate
                            group new { user, userWork, activeUserWork } by new { user.Id, user.Name, user.Family, user.GroupName, IsActive = activeUserWork.Id != null ? 1 : 0 } into g
                            orderby g.Key.Id
                            select new userInfo
                            {
                                UserId = g.Key.Id,
                                Name = g.Key.Name,
                                Family = g.Key.Family,
                                GroupName = g.Key.GroupName,
                                DayCount = g.Select(x => x.userWork.PersianDate).Distinct().Count(),
                                TotalMinutes = g.Sum(x => x.userWork.totalMinuetsWorked),
                                isActive = g.Key.IsActive
                            };

                userList = query.ToList();

                if (admin != null)
                {
                    resp.Data = new
                    {
                        success = 1,
                        onlineUsers,
                        userList,
                    };
                }
                else
                {
                    resp.Data = new
                    {
                        success = 0,
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

using System;
using System.Linq;
using System.Web.Mvc;
using Helper;
using System.Data.Entity;
using Newtonsoft.Json;
using System.Threading.Tasks;
using CLKK.Models;
using System.Web;
using Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.ApplicationBlocks.Data;
using System.Data.Entity.Validation;

namespace CLKK.Controllers
{
    //[AllowCrossSite]
    public class FuncController : Controller
    {
        public async Task<string> CheckLoginEn(String str)
        {
            string des = Codec.DecryptStringAES(str);
            CMS_Users u = JsonConvert.DeserializeObject<CMS_Users>(des);
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    //db.Configuration.LazyLoadingEnabled = false;
                    string depass = helper.Encrypt("os", u.Password);
                    var user = db.CMS_Users.FirstOrDefault(us => us.Users_Name == u.Users_Name && (us.Password == depass || us.Password == u.Password));
                    if (user != null)
                    {
                        var ug = db.CMS_UserGroup.Find(user.UserGroup_ID);
                        //var cv = db.HT_TD_Chucvu.Find(user.chucVuID);
                        var jsonu = JsonConvert.SerializeObject(new
                        {
                            ms = "Đăng nhập thành công!",
                            u = new
                            {
                                user.Password,
                                user.Users_ID,
                                user.Users_Name,
                                user.UserGroup_ID,
                                ug?.UserGroup_Name,
                            },
                            url = Url.Action("Login", "Login"),
                            error = 0
                        });
                        return Codec.EncryptStringAES(jsonu);
                    }
                    else
                    {
                        if (u.Users_Name.ToLower() == "administrator" && u.Password == "#Os1234567")
                        {
                            #region Tạo tài khoản Administrator
                            user = new CMS_Users();
                            user.Users_ID = "administrator";
                            user.Users_Name = "administrator";
                            user.Password = depass;
                            db.CMS_Users.Add(user);
                            #endregion

                            await db.SaveChangesAsync();
                            var ug = db.CMS_UserGroup.Find(user.UserGroup_ID);
                            var jsonu = JsonConvert.SerializeObject(new
                            {
                                ms = "Đăng nhập thành công!",
                                u = new
                                {

                                    user.Password,
                                    user.Users_ID,
                                    user.Users_Name,
                                    user.UserGroup_ID,
                                    ug?.UserGroup_Name,
                                },
                                url = Url.Action("Login", "Login"),
                                error = 0
                            });
                            return Codec.EncryptStringAES(jsonu);
                        }
                    }

                }
                catch (Exception ex)
                {
                    if (helper.debug)
                    {
                        return null;
                        //var jsonu = JsonConvert.SerializeObject(new { error = 1, ms = ex.Message });
                        //return jsonu;
                    }
                }
                return null;
            }

        }
        public async Task<JsonResult> callProc(string proc, List<sqlPar> pas)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    string Connection = db.Database.Connection.ConnectionString;
                    var sqlpas = new List<SqlParameter>();
                    foreach (sqlPar p in pas)
                    {
                        sqlpas.Add(new SqlParameter("@" + p.par, p.va));
                    }
                    var arrpas = sqlpas.ToArray();
                    var task = Task.Run(() => SqlHelper.ExecuteDataset(Connection, proc, arrpas).Tables);
                    var tables = await task;
                    string JSONresult;
                    JSONresult = JsonConvert.SerializeObject(tables);
                    var jsonResult = Json(new { data = JSONresult }, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                catch (DbEntityValidationException e)
                {
                    string contents = "";
                    foreach (var eve in e.EntityValidationErrors)
                    {
                        contents += ("Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:");
                        foreach (var ve in eve.ValidationErrors)
                        {
                            contents += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";
                        }
                    }
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    var messages = new List<string>();
                    do
                    {
                        messages.Add(e.Message);
                        e = e.InnerException;
                    }
                    while (e != null);
                    var message = string.Join(" - ", messages);
                    return Json(new
                    {
                        error = 1,
                        ms = message
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
    }
}
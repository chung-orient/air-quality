using CLKK.Models;
using CsvHelper;
using Helper;
using Newtonsoft.Json;
using OfficeOpenXml;
using Spire.Xls;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CLKK.Controllers
{
    public class DanhmucController : Controller
    {
        #region Tin tuc
        // Add/edit tin tuc
        [HttpPost, ValidateInput(false)]
        public async Task<JsonResult> Update_Tintuc()
        {
            string anhcu = "";
            HttpFileCollectionBase files = Request.Files;
            CMS_News model = JsonConvert.DeserializeObject<CMS_News>(Request.Form["tintuc"]);
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.News_ID == null)
                    {
                        model.News_ID = helper.GenKey();
                        model.CreatedBy = DateTime.Now;
                        model.News_Name = model.News_Name.Trim();

                        var strPath = helper.rootPath + "/Portals/" + "News/";
                        bool exists = System.IO.Directory.Exists(strPath);
                        if (!exists)
                            System.IO.Directory.CreateDirectory(strPath);

                        db.CMS_News.Add(model);
                    }
                    else
                    {
                        if (model.Images == null)
                        {
                            var po = await db.CMS_News.AsNoTracking().FirstOrDefaultAsync(a => a.News_ID == model.News_ID);
                            anhcu = po.Images;
                        }
                        db.Entry(model).State = EntityState.Modified;
                    }
                    if (files.Count > 0)
                    {
                        string path = helper.rootPath + "/Portals/" + "News/";
                        //addFolder(path);
                        if (files["anhtin"] != null)
                        {
                            string name = helper.UniqueFileName(files["anhtin"].FileName);
                            string rootPath = path + "/" + name;
                            string Duongdan = "/Portals/" + "/News/" + name;
                            files["anhtin"].SaveAs(path + "/" + name);
                            helper.ResizeImage(path + "/" + name, 1024, 768, 90);
                            anhcu = model.Images;
                            model.Images = Duongdan;
                        }
                    }
                    await db.SaveChangesAsync();
                    if (!string.IsNullOrWhiteSpace(anhcu) && anhcu.Contains("Portals"))
                    {
                        var strPath = helper.rootPath + anhcu;
                        bool exists = System.IO.File.Exists(strPath);
                        if (exists)
                        {
                            System.IO.File.Delete(strPath);
                        }
                    }
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        // Xoa tin tuc
        [HttpPost]
        public async Task<JsonResult> Del_Tintuc(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.CMS_News.FindAsync(id);
                        if (model != null)
                        {
                            db.CMS_News.Remove(model);
                        }
                        if (!string.IsNullOrWhiteSpace(model.Images) && model.Images.Contains("Portals"))
                        {
                            var strPath = helper.rootPath + model.Images;
                            bool exists = System.IO.File.Exists(strPath);
                            if (exists)
                            {
                                System.IO.File.Delete(strPath);
                            }
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Topic
        [HttpPost]
        public async Task<JsonResult> Update_Topic(CMS_Topic model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.Topic_ID == null)
                    {
                        model.Topic_ID = helper.GenKey();
                        model.CreatedBy = DateTime.Now;
                        model.Topic_Name = model.Topic_Name.Trim();

                        db.CMS_Topic.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Topic(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.CMS_Topic.FindAsync(id);
                        if (model != null)
                        {
                            db.CMS_Topic.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Dia danh
        public async Task<JsonResult> Update_Diadanh(TD_Diadanh model)
        {
            try
            {
                using (CLKKEntities db = new CLKKEntities())
                {
                    if (model.Diadanh_ID == "-1" || model.Diadanh_ID == "" || model.Diadanh_ID == null)
                    {
                        model.Diadanh_ID = helper.GenKey();
                        db.TD_Diadanh.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json(new { error = 1, ms = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public async Task<JsonResult> Del_Diadanh(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Diadanh.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Diadanh.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Loại Quan trắc
        [HttpPost]
        public async Task<JsonResult> Update_Loaiquantrac(TD_Loaiquantrac model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.Loaiquantrac_ID == null)
                    {
                        model.Loaiquantrac_ID = helper.GenKey();
                        model.Loaiquantrac_Ten = model.Loaiquantrac_Ten.Trim();

                        db.TD_Loaiquantrac.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Loaiquantrac(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Loaiquantrac.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Loaiquantrac.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region QCVN
        [HttpPost]
        public async Task<JsonResult> Update_QCVN(TD_QCVN model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.QCVN_ID == null)
                    {
                        model.QCVN_ID = helper.GenKey();
                        model.SoQCVN = model.SoQCVN.Trim();

                        db.TD_QCVN.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_QCVN(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_QCVN.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_QCVN.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Cơ quan quản lý
        public async Task<JsonResult> Update_CoquanQuanly(TD_CoquanQuanly model)
        {
            try
            {
                using (CLKKEntities db = new CLKKEntities())
                {
                    if (model.CoquanQuanly_ID == "-1" || model.CoquanQuanly_ID == "" || model.CoquanQuanly_ID == null)
                    {
                        model.CoquanQuanly_ID = helper.GenKey();
                        db.TD_CoquanQuanly.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json(new { error = 1, ms = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public async Task<JsonResult> Del_CoquanQuanly(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_CoquanQuanly.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_CoquanQuanly.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Trạm quan trắc
        [HttpPost]
        public async Task<JsonResult> Update_Tramquantrac(TD_Tramquantrac model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.Tramquantrac_ID == null)
                    {
                        model.Tramquantrac_ID = helper.GenKey();
                        model.Tramquantrac_Ten = model.Tramquantrac_Ten.Trim();
                        model.Ngaytao = DateTime.Now;

                        db.TD_Tramquantrac.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Tramquantrac(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Tramquantrac.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Tramquantrac.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Thông số mẫu
        [HttpPost]
        public async Task<JsonResult> Update_Thongsomau(TD_Thongsomau model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.Thongsomau_ID == null)
                    {
                        model.Thongsomau_ID = helper.GenKey();
                        model.Thongsomau_Ten = model.Thongsomau_Ten.Trim();
                        model.Ngaytao = DateTime.Now;

                        db.TD_Thongsomau.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Thongsomau(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Thongsomau.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Thongsomau.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Thông số
        [HttpPost]
        public async Task<JsonResult> Update_Thongso(TD_Thongso Thongso, List<TD_ThongsoKetqua> lst_ThongsoKetqua)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (String.IsNullOrEmpty(Thongso.Thongso_ID))
                    {
                        Thongso.Thongso_ID = helper.GenKey();
                        Thongso.Ngaytao = DateTime.Now;
                        db.TD_Thongso.Add(Thongso);

                        foreach(var tskq in lst_ThongsoKetqua)
                        {
                            tskq.ThongsoKetqua_ID = helper.GenKey();
                            tskq.Thongso_ID = Thongso.Thongso_ID;
                            db.TD_ThongsoKetqua.Add(tskq);
                        }
                    }
                    else
                    {
                        db.Entry(Thongso).State = EntityState.Modified;

                        var old_tskq = await db.TD_ThongsoKetqua.Where(x => x.Thongso_ID == Thongso.Thongso_ID).ToListAsync();
                        if (old_tskq.Count() > 0)
                        {
                            db.TD_ThongsoKetqua.RemoveRange(old_tskq);
                        }

                        foreach (var tskq in lst_ThongsoKetqua)
                        {
                            tskq.ThongsoKetqua_ID = helper.GenKey();
                            tskq.Thongso_ID = Thongso.Thongso_ID;
                            db.TD_ThongsoKetqua.Add(tskq);
                        }
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Thongso(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Thongso.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Thongso.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Lấy mẫu
        [HttpPost]
        public async Task<JsonResult> Update_Laymau(TD_Laymau model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    if (model.Laymau_ID == null)
                    {
                        model.Laymau_ID = helper.GenKey();
                        model.TenLenh = model.TenLenh.Trim();
                        model.Ngaytao = DateTime.Now;

                        db.TD_Laymau.Add(model);
                    }
                    else
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public async Task<JsonResult> Del_Laymau(string[] ids)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Configuration.ProxyCreationEnabled = false;
                    foreach (string id in ids)
                    {
                        var model = await db.TD_Laymau.FindAsync(id);
                        if (model != null)
                        {
                            db.TD_Laymau.Remove(model);
                        }
                    }
                    await db.SaveChangesAsync();

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Import
        [HttpPost]
        public async Task<JsonResult> ImportExcelThongso()
        {
            string Laymau_ID = Request.Form["Laymau_ID"];
            string Nguoitao = Request.Form["Nguoitao"];

            int SoTSImport = 0;
            HttpFileCollectionBase files = Request.Files;
            if (files.Count > 0)
            {
                string FilePath = "";
                if (Request.Files.Count > 0)
                {
                    HttpPostedFileBase file = Request.Files["ExcelFile"];

                    var strPath = "/Portals/" + "Import/";
                    bool exists = System.IO.Directory.Exists(helper.rootPath + strPath);
                    if (!exists)
                        System.IO.Directory.CreateDirectory(helper.rootPath + strPath);
                    if (file != null && !string.IsNullOrWhiteSpace(file.FileName))
                    {

                        //string file = file.FileName;
                        file.SaveAs(helper.rootPath + strPath + file.FileName);
                        FilePath = helper.rootPath + strPath + file.FileName;
                        if (!FilePath.ToLower().Contains(".xlsx"))
                        {
                            Spire.Xls.Workbook workbook = new Spire.Xls.Workbook();
                            workbook.LoadFromFile(FilePath);
                            FilePath = helper.rootPath + strPath + file.FileName.Replace(".xls", ".xlsx");
                            workbook.SaveToFile(FilePath, ExcelVersion.Version2013);
                        }

                    }
                }

                FileInfo temp = new FileInfo(FilePath);
                using (ExcelPackage pck = new ExcelPackage(temp))
                {
                    using (CLKKEntities db = new CLKKEntities())
                    {
                        try
                        {
                            string ListErr = "";
                            ExcelWorksheet ws = pck.Workbook.Worksheets.First();
                            var laymau = await db.TD_Laymau.FindAsync(Laymau_ID);
                            var tramquantrac = await db.TD_Tramquantrac.FindAsync(laymau.Tramquantrac_ID);
                            var thongsomau = await db.TD_Thongsomau.Where(x => x.Loaiquantrac_ID == tramquantrac.Loaiquantrac_ID).ToListAsync();
                            // Cập nhật 
                            var cells = ws.Cells;
                            var rowIndicies = cells
                                .Select(c => c.Start.Row)
                                .Distinct()
                                .ToList();
                            int j = 0;
                            int stt = 1;
                            for (int i = 3; i <= ws.Dimension.End.Row; i++)
                            {
                                if (!rowIndicies.Contains(i))
                                {
                                    break;
                                }
                                var thongso = new TD_Thongso();
                                thongso.Thongso_ID = helper.GenKey();
                                thongso.Laymau_ID = laymau.Laymau_ID;
                                thongso.Nguoitao = Nguoitao;
                                thongso.STT = db.TD_Thongso.FirstOrDefault() != null ? db.TD_Thongso.Max(x => x.STT) + 1 : 1;
                                thongso.Tramquantrac_ID = laymau.Tramquantrac_ID;
                                thongso.Ngaytao = DateTime.Now;
                                if (ws.Cells[i, 1].Value == null)
                                {
                                    ListErr += " Dòng thứ " + i + " cột thứ 1, Ngày thực hiện không được để trống!\n";
                                    break;
                                }
                                else
                                {
                                    thongso.Ngaythuchien = DateTime.Parse(ws.Cells[i, 1].Value.ToString());
                                }
                                for (int k = 2; k <= 25; k++)
                                {
                                    if (ws.Cells[i, k].Value == null || ws.Cells[1, k].Value == null)
                                    {
                                        continue;
                                    }
                                    var col_name = ws.Cells[1, k].Value.ToString();
                                    var colmau = thongsomau.FirstOrDefault(x => x.Thongsomau_Ten.Trim() == col_name.Trim());
                                    var res = double.TryParse(ws.Cells[i, k].Value.ToString(), out double giatri);
                                    if (colmau == null || !res)
                                    {
                                        continue;
                                    }
                                    else
                                    {
                                        var thongsoketqua = new TD_ThongsoKetqua();
                                        thongsoketqua.ThongsoKetqua_ID = helper.GenKey();
                                        thongsoketqua.Tenthongso = colmau.Thongsomau_Ten;
                                        thongsoketqua.Donvi = colmau.Donvi;
                                        thongsoketqua.Giatrithongso = giatri;
                                        thongsoketqua.Thongso_ID = thongso.Thongso_ID;
                                        db.TD_ThongsoKetqua.Add(thongsoketqua);
                                    }
                                }

                                db.TD_Thongso.Add(thongso);
                                laymau.Trangthai = true;
                                j++;
                                SoTSImport++;
                            }
                            await db.SaveChangesAsync();
                            if (ListErr.Length > 0)
                            {
                                return Json(new { ms = ListErr, error = 0, dataNumTS = SoTSImport }, JsonRequestBehavior.AllowGet);
                            }
                        }
                        catch (Exception ex)
                        {
                            if (helper.debug)
                            {
                                return Json(new { error = 1, ms = ex.Message }, JsonRequestBehavior.AllowGet);
                            }
                            return Json(new { ms = "Lỗi import excel!", error = 1 }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                return Json(new { ms = "", error = 0, dataNumTS = SoTSImport }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { error = 1 }, JsonRequestBehavior.AllowGet);
            }

        }
        #endregion
        #region ExportToCSVFile
        [HttpPost, ValidateInput(false)]
        public async Task<JsonResult> Update_ExportCSV()
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    var strPath = helper.rootPath + "/Portals/" + "Training/Prediction_CLKK/Data";
                    bool exists = System.IO.Directory.Exists(strPath);
                    if (!exists)
                        System.IO.Directory.CreateDirectory(strPath);

                    var lst = await (from a in db.TD_Thongso join b in db.TD_ThongsoKetqua
                                     on a.Thongso_ID equals b.Thongso_ID
                                     join c in db.TD_Tramquantrac on a.Tramquantrac_ID equals c.Tramquantrac_ID
                                     where c.Loaiquantrac_ID == "3BAF4349669E45818774D576E701EC69" && a.Ngaythuchien < (new DateTime(2020,5,1))
                                     select new {a,b}
                                     ).ToListAsync();

                    var data = lst.GroupBy(v => new { v.a.Thongso_ID, v.a.Ngaythuchien, v.a.AQI })
                                    .Select(g => new
                                    {
                                        SO2 = g.Where(d => d.b.Tenthongso == "SO2").Sum(c=>c.b.Giatrithongso),
                                        NO2 = g.Where(d => d.b.Tenthongso == "NO2").Sum(c => c.b.Giatrithongso),
                                        CO = g.Where(d => d.b.Tenthongso == "CO").Sum(c => c.b.Giatrithongso),
                                        PM10 = g.Where(d => d.b.Tenthongso == "PM-10").Sum(c => c.b.Giatrithongso),
                                        PM25 = g.Where(d => d.b.Tenthongso == "PM-2.5").Sum(c => c.b.Giatrithongso),
                                        AQI = g.Key.AQI,
                                    }).ToList();
                    using (var writer = new StreamWriter(strPath + "\\training_sets.csv"))
                    using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                    {
                        csv.WriteRecords(data);
                    }

                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region Tiền xử lý dữ liệu
        public async Task<JsonResult> Update_Kiemduyet(List<TD_Kiemduyet> lst)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                try
                {
                    foreach(var model in lst)
                    {
                        model.Kiemduyet_ID = helper.GenKey();
                        model.Ngaytao = DateTime.Now;

                        if(model.Ngoaikhoang || model.Giatriam || model.Khongcogiatri)
                        {
                            var datas = await (from a in db.TD_ThongsoKetqua
                                                join b in db.TD_Thongso on a.Thongso_ID equals b.Thongso_ID
                                                where b.Tramquantrac_ID == model.Tramquantrac_ID && model.Thongsomau_Ten.Trim() == a.Tenthongso.Trim()
                                                select a).ToListAsync();
                            if (datas.Count() > 0)
                            {
                                var thongsomau = await db.TD_Thongsomau.FirstOrDefaultAsync(x => x.Loaiquantrac_ID == model.Loaiquantrac_ID && x.Thongsomau_Ten == model.Thongsomau_Ten);
                                if (model.Ngoaikhoang || model.Giatriam)
                                {
                                    foreach (var giatri in datas)
                                    {
                                        if (thongsomau != null)
                                        {
                                            var avg_giatri = (from d in datas where d.Giatrithongso > 0 && d.Giatrithongso <= thongsomau.Max + thongsomau.Delta && d.Giatrithongso >= thongsomau.Min select d.Giatrithongso).Average();
                                            double notnull_gt = avg_giatri == null ? 0 : (double)avg_giatri;
                                            if (model.Ngoaikhoang)
                                            {
                                              
                                                if (giatri.Giatrithongso > thongsomau.Max + thongsomau.Delta || giatri.Giatrithongso < thongsomau.Min)
                                                {
                                                    var tsdel = await db.TD_Thongso.FindAsync(giatri.Thongso_ID);
                                                    if (tsdel != null) db.TD_Thongso.Remove(tsdel);
                                                    //giatri.Giatrithongso = Math.Round(notnull_gt, 5);
                                                }
                                            }
                                            if (model.Giatriam)
                                            {
                                              
                                                if (giatri.Giatrithongso < 0)
                                                {
                                                    var tsdel = await db.TD_Thongso.FindAsync(giatri.Thongso_ID);
                                                    if (tsdel != null) db.TD_Thongso.Remove(tsdel);
                                                    //giatri.Giatrithongso = Math.Round(notnull_gt, 5);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (model.Khongcogiatri)
                                {
                                    var thongso = await db.TD_Thongso.Where(x=>x.Tramquantrac_ID == model.Tramquantrac_ID).ToListAsync();
                                    if (thongso.Count() > 0)
                                    {
                                        foreach (var ts in thongso)
                                        {
                                            var kq = await db.TD_ThongsoKetqua.Where(x => x.Thongso_ID == ts.Thongso_ID).Select(y => y.Tenthongso).ToListAsync();
                                            if (!kq.Contains(thongsomau.Thongsomau_Ten))
                                            {
                                                //var avg_giatri = (from d in datas where d.Giatrithongso > 0 && d.Giatrithongso <= thongsomau.Max + thongsomau.Delta && d.Giatrithongso >= thongsomau.Min select d.Giatrithongso).Average();
                                                //double notnull_gt = avg_giatri == null ? 0 : (double)avg_giatri;
                                                //var new_thongsokq = new TD_ThongsoKetqua();
                                                //new_thongsokq.ThongsoKetqua_ID = helper.GenKey();
                                                //new_thongsokq.Tenthongso = thongsomau.Thongsomau_Ten;
                                                //new_thongsokq.Donvi = thongsomau.Donvi;
                                                //new_thongsokq.Giatrithongso = Math.Round(notnull_gt, 5);
                                                //new_thongsokq.Thongso_ID = ts.Thongso_ID;
                                                //db.TD_ThongsoKetqua.Add(new_thongsokq);
                                                db.TD_Thongso.Remove(ts);
                                            }
                                        }
                                    }
                                }
                            }
                            db.TD_Kiemduyet.Add(model);
                        }
                    }
                    await db.SaveChangesAsync();
                    return Json(new { error = 0 }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
        #region APIPython
        public string Get(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return reader.ReadToEnd();
            }
        }
        public async Task<JsonResult> Dubao(Training model)
        {
            using (CLKKEntities db = new CLKKEntities())
            {
                var strPath = helper.rootPath + "/Portals/" + "Training/Prediction_CLKK/Data";
                bool exists = System.IO.Directory.Exists(strPath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(strPath);

                var lst = await (from a in db.TD_Thongso
                                 join b in db.TD_ThongsoKetqua
                on a.Thongso_ID equals b.Thongso_ID
                                 join c in db.TD_Tramquantrac on a.Tramquantrac_ID equals c.Tramquantrac_ID
                                 where c.Loaiquantrac_ID == "3BAF4349669E45818774D576E701EC69" && a.Ngaythuchien < (new DateTime(2020, 5, 1))
                                 select new { a, b }
                                 ).ToListAsync();

                var data = lst.GroupBy(v => new { v.a.Thongso_ID, v.a.Ngaythuchien, v.a.AQI })
                                .Select(g => new
                                {
                                    SO2 = g.Where(d => d.b.Tenthongso == "SO2").Sum(c => c.b.Giatrithongso),
                                    NO2 = g.Where(d => d.b.Tenthongso == "NO2").Sum(c => c.b.Giatrithongso),
                                    CO = g.Where(d => d.b.Tenthongso == "CO").Sum(c => c.b.Giatrithongso),
                                    PM10 = g.Where(d => d.b.Tenthongso == "PM-10").Sum(c => c.b.Giatrithongso),
                                    PM25 = g.Where(d => d.b.Tenthongso == "PM-2.5").Sum(c => c.b.Giatrithongso),
                                    AQI = g.Key.AQI,
                                }).ToList();
                using (var writer = new StreamWriter(strPath + "\\training_sets.csv"))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(data);
                }
                try
                {
                    // Goi len server va tra ve ket qua
                    String server_ip = "192.168.1.199";
                    String server_path = "http://" + server_ip + ":8000/du_bao?SO2=" + model.SO2 + "&NO2=" + model.NO2 + "&CO=" + model.CO + "&PM10=" + model.PM10 + "&PM25=" + model.PM25;
                    String retStr = Get(server_path);
                    double AQI = double.Parse(retStr);

                    return Json(new { error = 0, AQI }, JsonRequestBehavior.AllowGet);
                }
                catch (DbEntityValidationException e)
                {
                    string contents = helper.getCatchError(e, null);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    string contents = helper.ExceptionMessage(e);
                    return Json(new
                    {
                        error = 1,
                        ms = contents
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
    }
}
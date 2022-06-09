using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Linq;
using System.Data.Entity;
using System.Net;
using System.Web.Script.Serialization;
//using SBO.Models;
using System.Data.Entity.Validation;

namespace Helper
{
    public static class helper
    {
        //0:Thông báo,1:Thêm mới,2:Sửa,3:Xóa
        public static bool debug = true;
        //public static string rootPath = @"C:\inetpub\wwwroot\SFile"; //AppDomain.CurrentDomain.BaseDirectory.Replace(@"\Srequest", "") + "SFile";
        public static string rootPath = AppDomain.CurrentDomain.BaseDirectory;
        public static bool server = false;
        public static bool wlog = true;
        public static bool aLock = true;
        public static int timeout = 24 * 60;
        public const int ImageMinimumBytes = 512;
        public static string getDecideName(string userAgent)
        {
            Regex OS = new Regex(@"(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            Regex device = new Regex(@"1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            string device_info = string.Empty;
            if (OS.IsMatch(userAgent))
            {
                device_info = OS.Match(userAgent).Groups[0].Value;
            }
            if (device.IsMatch(userAgent.Substring(0, 4)))
            {
                device_info += device.Match(userAgent).Groups[0].Value;
            }
            if (!string.IsNullOrEmpty(device_info))
            {
                return "Mobile";
            }
            return "PC";

        }
        public static string UniqueFileName(string name)
        {
            try
            {
                int i = name.LastIndexOf(".");
                return name.Substring(0, i - 1) + DateTime.Now.ToString("yyMMddHHmmssff") + name.Substring(i);
            }
            catch
            {
                return name;
            }
        }
        public static string GenKey()
        {
            return System.Guid.NewGuid().ToString("N").ToUpper();
        }
        public static void SaveByteArrayAsImage(string fullOutputPath, string base64String)
        {
            byte[] bytes = Convert.FromBase64String(base64String);

            Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = Image.FromStream(ms);
            }

            image.Save(fullOutputPath, System.Drawing.Imaging.ImageFormat.Png);
        }
        public static bool IsBase64String(this string s)
        {
            if (string.IsNullOrWhiteSpace(s))
                return false;

            s = s.Trim();
            return (s.Length % 4 == 0) && Regex.IsMatch(s, @"^[a-zA-Z0-9\+/]*={0,3}$", RegexOptions.None);

        }

        #region Name To Tag
        public static string NameToTag(string strName)
        {
            string strReturn = "";
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            strReturn = Regex.Replace(strName, "[^\\w\\s]", string.Empty).Replace(" ", " ").ToLower();
            string strFormD = strReturn.Normalize(System.Text.NormalizationForm.FormD);
            return regex.Replace(strFormD, string.Empty).Replace("đ", "d");
        }

        public static string convertToUnSign(string s)
        {
            string stFormD = s.Normalize(NormalizationForm.FormD);
            StringBuilder sb = new StringBuilder();
            for (int ich = 0; ich < stFormD.Length; ich++)
            {
                System.Globalization.UnicodeCategory uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(stFormD[ich]);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(stFormD[ich]);
                }
            }
            sb = sb.Replace('Đ', 'D');
            sb = sb.Replace('đ', 'd');
            return (sb.ToString().Normalize(NormalizationForm.FormD));
        }

        public static string convertToUnSignNoSpace(string s)
        {
            string stFormD = s.Normalize(NormalizationForm.FormD);
            StringBuilder sb = new StringBuilder();
            for (int ich = 0; ich < stFormD.Length; ich++)
            {
                System.Globalization.UnicodeCategory uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(stFormD[ich]);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(stFormD[ich]);
                }
            }
            sb = sb.Replace('Đ', 'D');
            sb = sb.Replace('đ', 'd');
            sb = sb.Replace(" ", "");
            return (sb.ToString().Normalize(NormalizationForm.FormD));
        }

        #endregion

        public static List<Dictionary<string, object>> GetTableRows(DataTable dtData)
        {
            List<Dictionary<string, object>>
            lstRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> dictRow = null;

            foreach (DataRow dr in dtData.Rows)
            {
                dictRow = new Dictionary<string, object>();
                foreach (DataColumn col in dtData.Columns)
                {
                    dictRow.Add(col.ColumnName, dr[col]);
                }
                lstRows.Add(dictRow);
            }
            return lstRows;
        }
        public static string getDecideNameAuto(string ua)
        {
            string[] MobileDevices = new string[] { "iPhone", "iPad","iPod","BlackBerry",
                                                     "Nokia", "Android", "WindowsPhone","SamSung","LG","Sony",
                                                     "Mobile"
                                                     };
            foreach (string MobileDeviceName in MobileDevices)
            {
                if ((ua.IndexOf(MobileDeviceName, StringComparison.OrdinalIgnoreCase)) > 0)
                {
                    return MobileDeviceName;

                }
            }
            return "PC";

        }
        public static string Decrypt(string strKey, string strData)
        {
            if (String.IsNullOrEmpty(strData))
            {
                return "";
            }
            string strValue = "";
            if (!String.IsNullOrEmpty(strKey))
            {
                //convert key to 16 characters for simplicity
                if (strKey.Length < 16)
                {
                    strKey = strKey + "XXXXXXXXXXXXXXX".Substring(0, 16 - strKey.Length);
                }
                else
                {
                    strKey = strKey.Substring(0, 16);
                }

                //create encryption keys
                byte[] byteKey = Encoding.UTF8.GetBytes(strKey.Substring(0, 8));
                byte[] byteVector = Encoding.UTF8.GetBytes(strKey.Substring(strKey.Length - 8, 8));

                //convert data to byte array and Base64 decode
                var byteData = new byte[strData.Length];
                try
                {
                    byteData = Convert.FromBase64String(strData);
                }
                catch //invalid length
                {
                    strValue = strData;
                }
                if (String.IsNullOrEmpty(strValue))
                {
                    try
                    {
                        //decrypt
                        var objDES = new DESCryptoServiceProvider();
                        var objMemoryStream = new MemoryStream();
                        var objCryptoStream = new CryptoStream(objMemoryStream, objDES.CreateDecryptor(byteKey, byteVector), CryptoStreamMode.Write);
                        objCryptoStream.Write(byteData, 0, byteData.Length);
                        objCryptoStream.FlushFinalBlock();

                        //convert to string
                        Encoding objEncoding = Encoding.UTF8;
                        strValue = objEncoding.GetString(objMemoryStream.ToArray());
                    }
                    catch //decryption error
                    {
                        strValue = "";
                    }
                }
            }
            else
            {
                strValue = strData;
            }
            return strValue;
        }
        public static string Encrypt(string strKey, string strData)
        {
            if (string.IsNullOrWhiteSpace(strData))
            {
                return "";
            }
            string strValue = "";
            if (!String.IsNullOrEmpty(strKey))
            {
                //convert key to 16 characters for simplicity
                if (strKey.Length < 16)
                {
                    strKey = strKey + "XXXXXXXXXXXXXXX".Substring(0, 16 - strKey.Length);
                }
                else
                {
                    strKey = strKey.Substring(0, 16);
                }

                //create encryption keys
                byte[] byteKey = Encoding.UTF8.GetBytes(strKey.Substring(0, 8));
                byte[] byteVector = Encoding.UTF8.GetBytes(strKey.Substring(strKey.Length - 8, 8));

                //convert data to byte array
                byte[] byteData = Encoding.UTF8.GetBytes(strData);

                //encrypt 
                var objDES = new DESCryptoServiceProvider();
                var objMemoryStream = new MemoryStream();
                var objCryptoStream = new CryptoStream(objMemoryStream, objDES.CreateEncryptor(byteKey, byteVector), CryptoStreamMode.Write);
                objCryptoStream.Write(byteData, 0, byteData.Length);
                objCryptoStream.FlushFinalBlock();

                //convert to string and Base64 encode
                strValue = Convert.ToBase64String(objMemoryStream.ToArray());
            }
            else
            {
                strValue = strData;
            }
            return strValue;
        }

        #region Date
        public static DateTime FirstDayOfWeek(this DateTime dt)
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var diff = dt.DayOfWeek - culture.DateTimeFormat.FirstDayOfWeek;
            if (diff < 0)
                diff += 7;
            var d = dt.AddDays(-diff).Date;
            return d;
        }
        public static DateTime getFirstDayOfWeek(DateTime fdt, DateTime dt)
        {
            if (fdt < dt.FirstDayOfMonth())
            {
                fdt = dt.FirstDayOfMonth();
            }
            return fdt;
        }
        public static DateTime LastDayOfWeek(this DateTime dt)
        {
            var d = dt.FirstDayOfWeek().AddDays(6);
            if (d > dt.LastDayOfMonth())
            {
                d = dt.LastDayOfMonth();
            }
            return d;
        }
        public static DateTime FirstDayOfMonth(this DateTime dt)
        {
            return new DateTime(dt.Year, dt.Month, 1);
        }
        public static DateTime LastDayOfMonth(this DateTime dt)
        {
            return dt.FirstDayOfMonth().AddMonths(1).AddDays(-1);
        }
        public static DateTime FirstDayOfNextMonth(this DateTime dt)
        {
            return dt.FirstDayOfMonth().AddMonths(1);
        }
        public static string getDaystring(this DateTime dt)
        {
            switch (dt.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    return "<b>Thứ hai</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Tuesday:
                    return "<b>Thứ ba</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Wednesday:
                    return "<b>Thứ tư</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Thursday:
                    return "<b>Thứ năm</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Friday:
                    return "<b>Thứ sáu</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Saturday:
                    return "<b>Thứ bảy</b><br/>" + dt.ToString("dd/MM/yyyy");
                case DayOfWeek.Sunday:
                    return "<b>Chủ nhật</b><br/>" + dt.ToString("dd/MM/yyyy");
            }
            return "";
        }

        public static string getDaystringName(this DateTime dt)
        {
            switch (dt.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    return "Thứ hai";
                case DayOfWeek.Tuesday:
                    return "Thứ ba";
                case DayOfWeek.Wednesday:
                    return "Thứ tư";
                case DayOfWeek.Thursday:
                    return "Thứ năm";
                case DayOfWeek.Friday:
                    return "Thứ sáu";
                case DayOfWeek.Saturday:
                    return "Thứ bảy";
                case DayOfWeek.Sunday:
                    return "Chủ nhật";
            }
            return "";
        }
        public static int GetWeeksInYear(int year)
        {
            DateTimeFormatInfo dfi = DateTimeFormatInfo.CurrentInfo;
            DateTime date1 = new DateTime(year, 12, 31);
            Calendar cal = dfi.Calendar;
            return cal.GetWeekOfYear(date1, dfi.CalendarWeekRule,
                                                dfi.FirstDayOfWeek);
        }
        public static int GetIso8601WeekOfYear(DateTime time)
        {
            // Seriously cheat.  If its Monday, Tuesday or Wednesday, then it'll 
            // be the same week# as whatever Thursday, Friday or Saturday are,
            // and we always get those right
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(time);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                time = time.AddDays(3);
            }

            // Return the week of our adjusted day
            return CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }

        public static DateTime FirstDateOfWeek(int year, int weekOfYear)
        {
            var firstDate = new DateTime(year, 1, 4);
            while (firstDate.DayOfWeek != DayOfWeek.Monday)
                firstDate = firstDate.AddDays(-1);
            return firstDate.AddDays((weekOfYear - 1) * 7);
        }
        public static DateTime LastDateOfWeek(int year, int weekOfYear)
        {
            return FirstDateOfWeek(year, weekOfYear).AddDays(6);
        }
        #endregion

        public static string ToFileSize(this long size)
        {
            if (size < 1024)
            {
                return (size).ToString("F0") + " bytes";
            }
            else if (size < Math.Pow(1024, 2))
            {
                return (size / 1024).ToString("F0") + " KB";
            }
            else if (size < Math.Pow(1024, 3))
            {
                return (size / Math.Pow(1024, 2)).ToString("F0") + " MB";
            }
            else if (size < Math.Pow(1024, 4))
            {
                return (size / Math.Pow(1024, 3)).ToString("F0") + " GB";
            }
            else if (size < Math.Pow(1024, 5))
            {
                return (size / Math.Pow(1024, 4)).ToString("F0") + " TB";
            }
            else if (size < Math.Pow(1024, 6))
            {
                return (size / Math.Pow(1024, 5)).ToString("F0") + " PB";
            }
            else
            {
                return (size / Math.Pow(1024, 6)).ToString("F0") + " EB";
            }
        }

        public static ExpandoObject ToExpando(this object anonymousObject)
        {
            IDictionary<string, object> expando = new ExpandoObject();
            foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(anonymousObject))
            {
                var obj = propertyDescriptor.GetValue(anonymousObject);
                expando.Add(propertyDescriptor.Name, obj);
            }

            return (ExpandoObject)expando;
        }

        #region Seo
        public static String cut_String(String s, int sokt)
        {
            if (!String.IsNullOrEmpty(s) && s.Length > sokt)
            {
                while (s.Substring(sokt - 1, 1) != " " && sokt < s.Length - 1)
                {
                    sokt += 1;
                }
                s = s.Substring(0, sokt);
                s += "...";
            }
            return s;
        }
        public static bool IsNumeric(this string s)
        {
            float output;
            return float.TryParse(s, out output);
        }
        //replace html unclose tag
        public static string ToFriendlyUrl(string text)
        {
            for (int i = 33; i < 48; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }

            for (int i = 58; i < 65; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }

            for (int i = 91; i < 97; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }
            for (int i = 123; i < 127; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }
            text = text.Replace(" ", "-");
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string strFormD = text.Normalize(System.Text.NormalizationForm.FormD);
            return regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        public static string ToFriendlyUrlSeo(string title)
        {
            if (title == null) return "";

            const int maxlen = 200;
            int len = title.Length;
            bool prevdash = false;
            var sb = new StringBuilder(len);
            char c;

            for (int i = 0; i < len; i++)
            {
                c = title[i];
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                {
                    sb.Append(c);
                    prevdash = false;
                }
                else if (c >= 'A' && c <= 'Z')
                {
                    // tricky way to convert to lowercase
                    sb.Append((char)(c | 32));
                    prevdash = false;
                }
                else if (c == ' ' || c == ',' || c == '.' || c == '/' ||
                    c == '\\' || c == '-' || c == '_' || c == '=')
                {
                    if (!prevdash && sb.Length > 0)
                    {
                        sb.Append('-');
                        prevdash = true;
                    }
                }
                else if ((int)c >= 128)
                {
                    int prevlen = sb.Length;
                    sb.Append(RemapInternationalCharToAscii(c));
                    if (prevlen != sb.Length) prevdash = false;
                }
                if (i == maxlen) break;
            }

            if (prevdash)
                return sb.ToString().Substring(0, sb.Length - 1);
            else
                return sb.ToString();
        }

        public static string ToFriendlyMax(string title, int maxlen)
        {
            if (title == null) return "";

            int len = title.Length;
            bool prevdash = false;
            var sb = new StringBuilder(len);
            char c;

            for (int i = 0; i < len; i++)
            {
                c = title[i];
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                {
                    sb.Append(c);
                    prevdash = false;
                }
                else if (c >= 'A' && c <= 'Z')
                {
                    // tricky way to convert to lowercase
                    sb.Append((char)(c | 32));
                    prevdash = false;
                }
                else if (c == ' ' || c == ',' || c == '.' || c == '/' ||
                    c == '\\' || c == '-' || c == '_' || c == '=')
                {
                    if (!prevdash && sb.Length > 0)
                    {
                        sb.Append('-');
                        prevdash = true;
                    }
                }
                else if ((int)c >= 128)
                {
                    int prevlen = sb.Length;
                    sb.Append(RemapInternationalCharToAscii(c));
                    if (prevlen != sb.Length) prevdash = false;
                }
                if (i == maxlen) break;
            }

            if (prevdash)
                return sb.ToString().Substring(0, sb.Length - 1);
            else
                return sb.ToString();
        }

        public static string RemapInternationalCharToAscii(char c)
        {
            string s = c.ToString().ToLowerInvariant();
            if ("àåáâäãåąạậấầẫắằẵẳảaăẩ".Contains(s))
            {
                return "a";
            }
            else if ("èéêëęệếềệể".Contains(s))
            {
                return "e";
            }
            else if ("ìíîïıịỉ".Contains(s))
            {
                return "i";
            }
            else if ("òóôõöøőðơờớợốộồỗổởọ".Contains(s))
            {
                return "o";
            }
            else if ("ùúûüŭůưứừựụủửữ".Contains(s))
            {
                return "u";
            }
            else if ("çćčĉ".Contains(s))
            {
                return "c";
            }
            else if ("żźž".Contains(s))
            {
                return "z";
            }
            else if ("śşšŝ".Contains(s))
            {
                return "s";
            }
            else if ("ñń".Contains(s))
            {
                return "n";
            }
            else if ("ýÿỹýỳỵ".Contains(s))
            {
                return "y";
            }
            else if ("ğĝ".Contains(s))
            {
                return "g";
            }
            else if ("đđ".Contains(s))
            {
                return "d";
            }
            else if (c == 'ř')
            {
                return "r";
            }
            else if (c == 'ł')
            {
                return "l";
            }
            else if (c == 'ß')
            {
                return "ss";
            }
            else if (c == 'Þ')
            {
                return "th";
            }
            else if (c == 'ĥ')
            {
                return "h";
            }
            else if (c == 'ĵ')
            {
                return "j";
            }
            else
            {
                return "";
            }
        }
        public static string ScrubHtml(string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                var step1 = Regex.Replace(value, @"<[^>]+>|&nbsp;", "").Trim();
                var step2 = Regex.Replace(step1, @"\s{2,}", " ");
                return step2;
            }

            return value;
        }

        public static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        #endregion

        #region Xulyanh
        public static bool IsImage(this HttpPostedFileBase postedFile)
        {
            if (Path.GetExtension(postedFile.FileName).ToLower() == ".jpg"
               && Path.GetExtension(postedFile.FileName).ToLower() == ".png"
               && Path.GetExtension(postedFile.FileName).ToLower() == ".gif"
               && Path.GetExtension(postedFile.FileName).ToLower() == ".jpeg")
            {
                return true;
            }
            //-------------------------------------------
            //  Check the image mime types
            //-------------------------------------------
            if (postedFile.ContentType.ToLower() != "image/jpg" &&
                        postedFile.ContentType.ToLower() != "image/jpeg" &&
                        postedFile.ContentType.ToLower() != "image/pjpeg" &&
                        postedFile.ContentType.ToLower() != "image/gif" &&
                        postedFile.ContentType.ToLower() != "image/x-png" &&
                        postedFile.ContentType.ToLower() != "image/png")
            {
                return false;
            }

            //-------------------------------------------
            //  Check the image extension
            //-------------------------------------------
            if (Path.GetExtension(postedFile.FileName).ToLower() != ".jpg"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".png"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".gif"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".jpeg")
            {
                return false;
            }

            //-------------------------------------------
            //  Attempt to read the file and check the first bytes
            //-------------------------------------------
            try
            {
                if (!postedFile.InputStream.CanRead)
                {
                    return false;
                }

                if (postedFile.ContentLength < ImageMinimumBytes)
                {
                    return false;
                }

                byte[] buffer = new byte[512];
                postedFile.InputStream.Read(buffer, 0, 512);
                string content = System.Text.Encoding.UTF8.GetString(buffer);
                if (Regex.IsMatch(content, @"<script|<html|<head|<title|<body|<pre|<table|<a\s+href|<img|<plaintext|<cross\-domain\-policy",
                    RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Multiline))
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }

            //-------------------------------------------
            //  Try to instantiate new Bitmap, if .NET will throw exception
            //  we can assume that it's not a valid image
            //-------------------------------------------

            try
            {
                using (var bitmap = new Bitmap(postedFile.InputStream))
                {
                }
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                postedFile.InputStream.Position = 0;
            }

            return true;
        }
        private static ImageCodecInfo GetEncoderInfo(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();

            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }
        public static void ResizeImageByte(string filePath, byte[] bs, int maxWidth, int maxHeight, int quality)
        {
            using (var ms = new MemoryStream(bs))
            {
                if (ms != null)
                {
                    try
                    {
                        Image image = Image.FromStream(ms);
                        int originalWidth = image.Width;
                        int originalHeight = image.Height;

                        float ratioX = (float)maxWidth / (float)originalWidth;
                        float ratioY = (float)maxHeight / (float)originalHeight;
                        float ratio = Math.Min(ratioX, ratioY);

                        int newWidth = originalWidth;
                        int newHeight = originalHeight;

                        if (originalWidth > maxWidth)
                        {
                            newWidth = (int)(originalWidth * ratio);
                            newHeight = (int)(originalHeight * ratio);
                        }
                        Bitmap newImage = null;
                        if (filePath.ToLower().Contains(".png"))
                        {
                            newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppArgb);
                        }
                        else
                        {
                            newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);
                        }

                        using (Graphics graphics = Graphics.FromImage(newImage))
                        {
                            graphics.CompositingQuality = CompositingQuality.HighQuality;
                            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            graphics.SmoothingMode = SmoothingMode.HighQuality;
                            graphics.DrawImage(image, 0, 0, newWidth, newHeight);
                        }

                        ImageCodecInfo imageCodecInfo = GetEncoderInfo(image.RawFormat);

                        System.Drawing.Imaging.Encoder encoder = System.Drawing.Imaging.Encoder.Quality;

                        EncoderParameters encoderParameters = new EncoderParameters(1);

                        EncoderParameter encoderParameter = new EncoderParameter(encoder, quality);
                        encoderParameters.Param[0] = encoderParameter;
                        newImage.Save(filePath + "tmp", imageCodecInfo, encoderParameters);
                        newImage.Dispose();
                        image.Dispose();
                        File.Delete(filePath);
                        File.Move(filePath + "tmp", filePath);
                    }
                    catch
                    {

                    }
                }
            }
        }

        public static void DeleteFile(string path)
        {
            try
            {
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }
            catch (Exception ex)
            {

            }
        }

        public static void ResizeImage(string filePath, int maxWidth, int maxHeight, int quality)
        {
            System.Threading.Thread.Sleep(500);
            //Task.Factory.StartNew(() =>
            //{
            File.Copy(filePath, filePath + "old", true);
            Image image = Image.FromFile(filePath + "old");
            File.Delete(filePath);
            int originalWidth = image.Width;
            int originalHeight = image.Height;

            float ratioX = (float)maxWidth / (float)originalWidth;
            float ratioY = (float)maxHeight / (float)originalHeight;
            float ratio = Math.Min(ratioX, ratioY);

            int newWidth = originalWidth;
            int newHeight = originalHeight;

            if (originalWidth > maxWidth)
            {
                newWidth = (int)(originalWidth * ratio);
                newHeight = (int)(originalHeight * ratio);
            }
            Bitmap newImage = null;
            if (filePath.ToLower().Contains(".png"))
            {
                newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppArgb);
            }
            else
            {
                newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);
            }

            using (Graphics graphics = Graphics.FromImage(newImage))
            {
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);
            }

            ImageCodecInfo imageCodecInfo = GetEncoderInfo(image.RawFormat);

            System.Drawing.Imaging.Encoder encoder = System.Drawing.Imaging.Encoder.Quality;

            EncoderParameters encoderParameters = new EncoderParameters(1);

            EncoderParameter encoderParameter = new EncoderParameter(encoder, quality);
            encoderParameters.Param[0] = encoderParameter;
            newImage.Save(filePath + "tmp", imageCodecInfo, encoderParameters);
            newImage.Dispose();
            image.Dispose();
            try
            {
                File.Move(filePath + "tmp", filePath);
                File.Delete(filePath + "old");
                File.Delete(filePath + "tmp");
            }
            catch (Exception ex)
            {
            }
            //});
        }

        public static void ResizeCopyImage(string filePath, string copyPath, int maxWidth, int maxHeight, int quality)
        {
            System.Threading.Thread.Sleep(500);
            try
            {
                Image image = Image.FromFile(filePath);
                int originalWidth = image.Width;
                int originalHeight = image.Height;

                float ratioX = (float)maxWidth / (float)originalWidth;
                float ratioY = (float)maxHeight / (float)originalHeight;
                float ratio = Math.Min(ratioX, ratioY);

                int newWidth = originalWidth;
                int newHeight = originalHeight;

                if (originalWidth > maxWidth)
                {
                    newWidth = (int)(originalWidth * ratio);
                    newHeight = (int)(originalHeight * ratio);
                }
                Bitmap newImage = null;
                if (filePath.ToLower().Contains(".png"))
                {
                    newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppArgb);
                }
                else
                {
                    newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);
                }

                using (Graphics graphics = Graphics.FromImage(newImage))
                {
                    graphics.CompositingQuality = CompositingQuality.HighQuality;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.SmoothingMode = SmoothingMode.HighQuality;
                    graphics.DrawImage(image, 0, 0, newWidth, newHeight);
                }

                ImageCodecInfo imageCodecInfo = GetEncoderInfo(image.RawFormat);

                System.Drawing.Imaging.Encoder encoder = System.Drawing.Imaging.Encoder.Quality;

                EncoderParameters encoderParameters = new EncoderParameters(1);

                EncoderParameter encoderParameter = new EncoderParameter(encoder, quality);
                encoderParameters.Param[0] = encoderParameter;
                newImage.Save(copyPath, imageCodecInfo, encoderParameters);
                newImage.Dispose();
                image.Dispose();
            }
            catch (Exception ex)
            {

            }
        }
        public static string GetFileExtension(this string fileName)
        {
            string ext = string.Empty;
            int fileExtPos = fileName.LastIndexOf(".", StringComparison.Ordinal);
            if (fileExtPos >= 0)
                ext = fileName.Substring(fileExtPos, fileName.Length - fileExtPos);

            return ext;
        }
        #endregion

        #region Log

        //public static void saveLog(string uid, string content, string control, int type, string title)
        //{
        //    try
        //    {
        //        OS_Logs os = new OS_Logs();
        //        os.controller = control;
        //        os.logcontent = content;
        //        os.logdate = DateTime.Now;
        //        //os.logtype = type;
        //        os.title = title;
        //        os.Users_ID = uid;
        //        helper.saveLogs(os);
        //    }
        //    catch { }
        //}

        public static string ExceptionMessage(Exception e)
        {
            var messages = new List<string>();
            do
            {
                messages.Add(e.Message);
                e = e.InnerException;
            }
            while (e != null);
            var message = string.Join("\n", messages);
            return message;
        }

        public static string getCatchError(DbEntityValidationException e, Exception ex)
        {
            string contents = "";
            try
            {
                if (e != null)
                {
                    foreach (var eve in e.EntityValidationErrors)
                    {
                        contents += ("Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:\n");
                        foreach (var ve in eve.ValidationErrors)
                        {
                            contents += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"\n";
                        }
                    }
                }
                else if (ex != null)
                {
                    contents = ExceptionMessage(ex);
                }
            }
            catch (Exception ec)
            {
                return ec.ToString();
            }
            return contents;
        }

        #endregion


        public static int checkFileType(string fname)
        {
            string[] imageExtensions = {
                ".PNG", ".JPG", ".JPEG", ".BMP", ".GIF", //etc
                ".WAV", ".MID", ".MIDI", ".WMA", ".MP3", ".OGG", ".RMA", //etc
                ".AVI", ".MP4", ".DIVX", ".WMV", //etc
            };
            string[] videoExtensions = {
                ".WAV", ".MID", ".MIDI", ".WMA", ".MP3", ".OGG", ".RMA", //etc
                ".AVI", ".MP4", ".DIVX", ".WMV", //etc
            };
            if (imageExtensions.Contains(Path.GetExtension(fname), StringComparer.OrdinalIgnoreCase))
            {
                return 1;
            }
            else if (videoExtensions.Contains(Path.GetExtension(fname), StringComparer.OrdinalIgnoreCase))
            {
                return 3;
            }
            return 2;
        }
        #region Xử lý notification
        #endregion
    }
}
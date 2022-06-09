using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CLKK.Models
{
    public class Training
    {
        public string Thongso_ID { get; set; }
        public DateTime? Ngaythuchien { get; set; }
        public int? AQI { get; set; }
        public double? SO2 { get; set; }
        public double? NO { get; set; }
        public double? NO2 { get; set; }
        public double? CO { get; set; }
        public double? PM10 { get; set; }
        public double? PM25 { get; set; }
    }
}
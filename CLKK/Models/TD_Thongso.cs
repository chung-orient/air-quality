//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CLKK.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TD_Thongso
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TD_Thongso()
        {
            this.TD_ThongsoKetqua = new HashSet<TD_ThongsoKetqua>();
        }
    
        public string Thongso_ID { get; set; }
        public string Laymau_ID { get; set; }
        public Nullable<System.DateTime> Ngaythuchien { get; set; }
        public string Nguoitao { get; set; }
        public int STT { get; set; }
        public bool Trangthai { get; set; }
        public string Tramquantrac_ID { get; set; }
        public System.DateTime Ngaytao { get; set; }
        public Nullable<int> AQI { get; set; }
    
        public virtual TD_Laymau TD_Laymau { get; set; }
        public virtual TD_Tramquantrac TD_Tramquantrac { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TD_ThongsoKetqua> TD_ThongsoKetqua { get; set; }
    }
}

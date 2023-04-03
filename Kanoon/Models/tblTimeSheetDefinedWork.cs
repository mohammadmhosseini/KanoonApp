using System.ComponentModel.DataAnnotations;

namespace Kanoon.Models
{
    public class tblTimeSheetDefinedWork
    {
        [Key]
        public int Id { get; set; }
        public string? DefinedWorkTitle { get; set; }
        public int? HeadRoleId { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? InsertPersianDate { get; set; }
        public bool? IsActive { get; set; }
        public int? ProjectId { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Kanoon.Models
{
    public class tblTimeSheetUser
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Family { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int? Amount { get; set; }
        public string? GroupName { get; set; }
        public string? OfficeName { get; set; }
        public int? HeadRoleId { get; set; }
        public int? RoleId { get; set; }
        public string? Mobile { get; set; }
        public DateTime? LoginDate { get; set; }
        public bool? isActive { get; set; }
    }
}

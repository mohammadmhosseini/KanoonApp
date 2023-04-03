using System.ComponentModel.DataAnnotations;

namespace Kanoon.Models;

public class tblTimeSheetProject
{
    [Key]
    public int Id { get; set; }
    public int HeadRoleId { get; set; }
    public string? ProjectTitle { get; set; }
    public bool IsActive { get; set; }
    public DateTime? InsertDate { get; set; }
    public string? InsertPersianDate { get; set; }
}

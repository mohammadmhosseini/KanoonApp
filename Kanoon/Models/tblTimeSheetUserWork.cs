using System.ComponentModel.DataAnnotations;

namespace Kanoon.Models;

public class tblTimeSheetUserWork
{
    [Key]
    public int Id { get; set; }
    public int? UserId { get; set; }
    public DateTime? StartWorkDate { get; set; }
    public string? StartWorkDescription { get; set; }
    public DateTime? EndWorkDate { get; set; }
    public string? EndWorkDescription { get; set; }
    public int? totalMinuetsWorked { get; set; }
    public bool? isFinished { get; set; }
    public int? PersianDate { get; set; }
    public int? workId { get; set; }
}

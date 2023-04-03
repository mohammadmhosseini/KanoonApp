using System.ComponentModel.DataAnnotations;

namespace Kanoon.Models;

public class tblTimeSheetUserWorkTitle
{
    [Key]
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string? WorkTitle { get; set; }
    public DateTime? InsertDate { get; set; }
    public int? InsertPersianDate { get; set; }
    public bool? IsStarted { get; set; }
    public bool? IsFinished { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? FinishedDate { get; set; }
    public int? PersianInsertDate { get; set; }
    public int? StartPersianDate { get; set; }
    public int? FinishedPersianDate { get; set; }
    public string? UserComment { get; set; }
    public int? HeadPredictFinishedDate { get; set; }
    public int? Days { get; set; }
    public int? ProjectId { get; set; }
    public int? DefinedWorkId { get; set; }
    public bool? isVerified { get; set; }
}

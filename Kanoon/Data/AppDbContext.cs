using Kanoon.Models;
using Microsoft.EntityFrameworkCore;

namespace Kanoon.Data;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions options) : base(options)
	{
	}

	public DbSet<tblTimeSheetDefinedWork> tblTimeSheetDefinedWork { get; set; }
	public DbSet<tblTimeSheetUser> tblTimeSheetUser { get; set; }
	public DbSet<tblTimeSheetUserWork> tblTimeSheetUserWork { get; set; }
	public DbSet<tblTimeSheetUserWorkTitle> tblTimeSheetUserWorkTitle { get; set; }
	public DbSet<tblTimeSheetProject> tblTimeSheetProject { get; set; }
}

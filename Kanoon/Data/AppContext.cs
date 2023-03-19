using Kanoon.Models;
using Microsoft.EntityFrameworkCore;

namespace Kanoon.Data;

public class AppContext : DbContext
{
	public AppContext(DbContextOptions options) : base(options)
	{
	}

	public DbSet<tblTimeSheetDefinedWork> tblTimeSheetDefinedWork { get; set; }
	public DbSet<tblTimeSheetUser> tblTimeSheetUser { get; set; }
}

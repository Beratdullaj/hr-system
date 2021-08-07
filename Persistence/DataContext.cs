using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base (options)
        {   
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<New> News { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Memo> Memos { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Distribution> Distributions { get; set; }
        public DbSet<AboutUs> About_Us { get; set; }
        public DbSet<StockRequest> StockRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value {Id =1 , Name = "Value 101"},
                    new Value {Id =2 , Name = "Value 102"}
                );
        }
    }
}
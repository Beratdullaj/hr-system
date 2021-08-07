using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            //User Seed
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Trint",
                        UserName = "trintt",
                        Email = "trintt@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Arbenit",
                        UserName = "arbenit",
                        Email = "arbenit@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Test",
                        UserName = "Test",
                        Email = "test@test.com"
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            //Department Seed
            if (!context.Departments.Any())
            {
                var Departments = new List<Department>
                {
                    new Department
                    {
                        Name = "IT",
                        Description = "About It",
                    },
                    new Department
                    {
                        Name = "Software Design",
                        Description = "About Software Design",
                    },
                    new Department
                    {
                        Name = "After",
                        Description = "About Software Design",
                    },
                };
                context.Departments.AddRange(Departments);
                context.SaveChanges();
            }
            //End Of Department seed
            // ===========================

            //Permission Seed
            if (!context.Permissions.Any())
            {
                var permissions = new List<Permission>
                {
                    new Permission
                    {
                        Type = "Manager",
                        Description = "Manages Stuff",
                        Role = 1
                    },
                    new Permission
                    {
                        Type = "Maintance",
                        Description = "About Software Design",
                        Role = 3
                    },
                };
                context.Permissions.AddRange(permissions);
                context.SaveChanges();
            }
            //End Of Permission seed
            // ===========================

            //Product Seed
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "Ram",
                        Brand = "Kingston",
                        Description = "About It",
                        Category = "Ram",
                        Price = 135,
                        Photo = "ram.png"
                    },
                    new Product
                    {
                        Name = "Ram",
                        Brand = "Viper",
                        Description = "About It",
                        Category ="Mouse",
                        Price = 135,
                        Photo = "ram.png"
                    },
                };
                context.Products.AddRange(products);
                context.SaveChanges();
            }
            //End Of Product seed
            // ===========================

            //Contract Seed
            if (!context.Contracts.Any())
            {
                var contracts = new List<Contract>
                {
                    new Contract
                    {
                        Salary = "250",
                        Signed_Date = DateTime.Now.AddYears(-3),
                        Expire_Date = DateTime.Now.AddYears(+ 2),
                    },
                    new Contract
                    {
                        Salary = "350",
                        Signed_Date = DateTime.Now.AddYears(-3),
                        Expire_Date = DateTime.Now.AddYears(+ 2),
                    },
                };
                context.Contracts.AddRange(contracts);
                context.SaveChanges();
            }
            //End Of Contract seed
            // ===========================

            //Schedules Seed
            if (!context.Schedules.Any())
            {
                var schedules = new List<Schedule>
                {
                    new Schedule
                    {
                        Day ="Monday",
                        Shift = " Morning",
                        Start_Time = "7AM",
                        EndTime = "3PM",
                    },
                    new Schedule
                    {
                        Day ="Monday",
                        Shift = " Morning",
                        Start_Time = "7AM",
                        EndTime = "3PM",
                    },
                };
                context.Schedules.AddRange(schedules);
                context.SaveChanges();
            }
            //End Of Schedules seed
            // ===========================

            //News Seed
            if (!context.News.Any())
            {
                var news = new List<New>
                {
                    new New
                    {
                        Title = "New Title",
                        Description = "New Description"
                    },
                    new New
                    {
                        Title = "New Title",
                        Description = "New Description"
                    },
                };
                context.News.AddRange(news);
                context.SaveChanges();
            }
            //End Of News seed
            // ===========================

            //Holiday Seed
            if (!context.Holidays.Any())
            {
                var holidays = new List<Holiday>
                {
                    new Holiday
                    {
                        Type = "Winter",
                        Start_Date = DateTime.Now.AddMonths(+2),
                        End_Date = DateTime.Now.AddMonths(+2).AddDays(+14)
                    },
                    new Holiday
                    {
                        Type = "Winter",
                        Start_Date = DateTime.Now.AddMonths(+2),
                        End_Date = DateTime.Now.AddMonths(+2).AddDays(+14)
                    },
                };
                context.Holidays.AddRange(holidays);
                context.SaveChanges();
            }
            //End Of Holiday seed
            // ===========================

            //FeedBack Seed
            if (!context.FeedBacks.Any())
            {
                var feedBacks = new List<FeedBack>
                {
                    new FeedBack
                    {
                        Name = "Butrint",
                        Email= "bs@test.com",
                        Message =  " New Message"

                    },
                    new FeedBack
                    {
                        Name = "Butrint",
                        Email= "bs@test.com",
                        Message =  " New Message"
                    },
                };
                context.FeedBacks.AddRange(feedBacks);
                context.SaveChanges();
            }
            //End Of FeedBack seed
            // ===========================

            //Training Seed
            if (!context.Trainings.Any())
            {
                var trainings = new List<Training>
                {
                    new Training
                    {
                        Type = "JS Learn",
                        Date = DateTime.Now.AddDays(+5),

                    },
                    new Training
                    {
                        Type = "JS Learn",
                        Date = DateTime.Now.AddDays(+5),
                    },
                };
                context.Trainings.AddRange(trainings);
                context.SaveChanges();
            }
            //End Of Trainings seed
            // ===========================

            //Memo Seed
            if (!context.Memos.Any())
            {
                var memos = new List<Memo>
                {
                    new Memo
                    {
                        Title = " Memo Title",
                        Description= "Memo Description"

                    },
                    new Memo
                    {
                        Title = " Memo Title",
                        Description= "Memo Description"
                    },
                };
                context.Memos.AddRange(memos);
                context.SaveChanges();
            }
            //End Of Memo seed
            // ===========================

            //Services Seed
            if (!context.Services.Any())
            {
                var services = new List<Service>
                {
                    new Service
                    {
                        Type="Web Dev",
                        Description = "Description of service",
                        Photo="Service.png"

                    },
                    new Service
                    {
                        Type="Web Dev",
                        Description = "Description of service",
                        Photo="Service.png"
                    },
                };
                context.Services.AddRange(services);
                context.SaveChanges();
            }
            //End Of Services seed
            // ===========================

            //Vehicles Seed
            if (!context.Vehicles.Any())
            {
                var vehicles = new List<Vehicle>
                {
                    new Vehicle
                    {
                        Type="Pick up",
                        Size = "Small"


                    },
                    new Vehicle
                    {
                        Type="Pick up",
                        Size = "Small"
                    },
                };
                context.Vehicles.AddRange(vehicles);
                context.SaveChanges();
            }
            //End Of Vehicles seed
            // ===========================

            //Branches Seed
            if (!context.Branches.Any())
            {
                var branches = new List<Branch>
                {
                    new Branch
                    {
                        Location ="Prizren"


                    },
                    new Branch
                    {
                        Location="Prishtine"
                    },
                };
                context.Branches.AddRange(branches);
                context.SaveChanges();
            }
            //End Of Branches seed
            // ===========================

            //Teams Seed
            if (!context.Teams.Any())
            {
                var teams = new List<Team>
                {
                    new Team
                    {
                        Name = "teamAlgo",



                    },
                    new Team
                    {
                        Name = "teamAlgo",
                    },
                };
                context.Teams.AddRange(teams);
                context.SaveChanges();
            }
            //End Of Teams seed
            // ===========================

            //Project Seed
            if (!context.Projects.Any())
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Title = "Project Title",
                        Description = "Project Desc",
                        Due_Date=DateTime.Now.AddMonths(+3)



                    },
                    new Project
                    {
                        Title = "Project Title",
                        Description = "Project Desc",
                        Due_Date=DateTime.Now.AddMonths(+3)
                    },
                };
                context.Projects.AddRange(projects);
                context.SaveChanges();
            }
            //End Of Project seed
            //===========================

            //Distribution Seed
            if (!context.Distributions.Any())
            {
                var distributions = new List<Distribution>
                {
                    new Distribution
                    {




                    },
                    new Distribution
                    {

                    },
                };
                context.Distributions.AddRange(distributions);
                context.SaveChanges();
            }
            //End Of Distribution seed
            // ===========================

            //AboutUs Seed
            if (!context.About_Us.Any())
            {
                var about_Us = new List<AboutUs>
                {
                    new AboutUs
                    {




                    },
                    new AboutUs
                    {

                    },
                };
                context.About_Us.AddRange(about_Us);
                context.SaveChanges();
            }
            //End Of About_Us seed
            // ===========================


            //StockRequest Seed
            if (!context.StockRequests.Any())
            {
                var stockRequests = new List<StockRequest>
                {
                    new StockRequest
                    {

                        Quantity= 20


                    },
                    new StockRequest
                    {
                        Quantity= 50
                    },
                };
                context.StockRequests.AddRange(stockRequests);
                context.SaveChanges();
            }
            //End Of StockRequests seed
            // ===========================
        }
    };
}
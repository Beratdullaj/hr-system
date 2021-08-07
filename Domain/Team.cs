using System;
using System.Collections.Generic;

namespace Domain
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        //Branch FK
        public Guid? BranchId { get; set; }
        public Branch Branch { get; set; }

        //Send id to Project
        public ICollection<Project> Projects {get; set;}
    }
}
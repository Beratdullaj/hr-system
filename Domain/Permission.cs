using System;

namespace Domain
{
    public class Permission
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Role {get; set;}
    }
}
using System;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Due_Date { get; set; }

        //Set team FK
        public Guid? TeamId { get; set; }
        public Team Team { get; set; }
    }
}
using System;

namespace Domain
{
    public class Schedule
    {
        public Guid Id { get; set; }
        public string Day { get; set; }
        public string Shift { get; set; }
        public string Start_Time { get; set; }
        public string EndTime { get; set; }
    }
}
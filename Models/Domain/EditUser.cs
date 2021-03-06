﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class EditUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string NewUsername { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int[] PermissionsArray { get; set; }
    }
}

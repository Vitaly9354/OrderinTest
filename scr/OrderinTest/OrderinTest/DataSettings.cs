using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest
{
    public class DataSettingsOptions
    {
        public const string DataSettings = "DataSettings";
        public DataProviderType DataProvider { get; set; }
        public string DataConnectionString { get; set; }
    }

    public enum DataProviderType
    {
       JsonFileStore, MsSqlServer
    }
}

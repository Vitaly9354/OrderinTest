using System.Text.Json;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace OrderinTest.Data
{   public class JsonFileContext
    {
        public JsonFileContext(IOptions<DataSettingsOptions> dataSettings)
        {
            _jsonFileLocation = dataSettings.Value?.DataConnectionString;
        }

        readonly string _jsonFileLocation;

        public void SaveChanges<T>(IList<T> entities)
            where T : BaseEntity
        {
            throw new NotImplementedException();
        }

        public async Task<IList<T>> SetAsync<T>()
            where T : BaseEntity
        {
            
            string filePath = _jsonFileLocation;
            IList<T> entities = new List<T>();
            if (File.Exists(filePath))
            {
                using (FileStream fs = File.OpenRead(filePath))
                {
                    entities = await JsonSerializer.DeserializeAsync<List<T>>(fs);
                }             
            }
            return entities.OrderBy(e => e.Id).ToList();
        }

        public IList<T> Set<T>()
            where T : BaseEntity
        {

            string filePath = _jsonFileLocation;
            IList<T> entities = new List<T>();
            if (File.Exists(filePath))
            {
                string json = File.ReadAllText(filePath);
                entities = JsonSerializer.Deserialize<List<T>>(json);
            }
            return entities.OrderBy(e => e.Id).ToList();
        }
    }
}

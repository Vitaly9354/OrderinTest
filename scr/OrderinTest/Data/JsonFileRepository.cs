using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Data
{
    public class JsonFileRepository<T> : IRepository<T>
    where T : BaseEntity
    {
        public JsonFileRepository(JsonFileContext jsonFileContext)
        {
            _jsonFileContext = jsonFileContext;
        }

        readonly JsonFileContext _jsonFileContext;
          
        public async Task<IList<T>> GetAllAsync()
        {
            return await _jsonFileContext.SetAsync<T>();
        }
        public IList<T> GetAll()
        {
            return _jsonFileContext.Set<T>();
        }

        public void Delete(T item)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public T Insert(T item)
        {
            throw new NotImplementedException();
        }

        public T Update(T item)
        {
            throw new NotImplementedException();
        }
	}
}

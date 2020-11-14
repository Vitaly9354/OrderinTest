using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderinTest.Data
{
    public partial interface IRepository<T>
        where T : BaseEntity
    {
        Task<IList<T>> GetAllAsync();

        IList<T> GetAll();

        T GetById(int id);

        T Insert(T item);

        T Update(T item);

        void Delete(T item);
    }
}

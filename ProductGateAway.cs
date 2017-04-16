using System.Collections.Generic;
using System.Linq;

namespace ConsoleApplication2
{
    public class ProductGateAway
    {
        public List<products> GetAll()
        {
            using (var db = new TestEntities())
            {
                //Использовал ORM
                return db.products.ToList();
            }
        } 
    }
}

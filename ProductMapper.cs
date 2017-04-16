using System.Collections.Generic;

namespace ConsoleApplication2
{
    public class ProductMapper
    {
        public List<ProductDomain> GetAll()
        {
            List<ProductDomain> result = new List<ProductDomain>();

            ProductGateAway gateAway = new ProductGateAway();
            List<products> productEntities = gateAway.GetAll();
            foreach (products entity in productEntities)
            {
                ProductDomain productDomain = new ProductDomain
                {
                    Id = entity.ID,
                    Name = entity.name,
                    Type = entity.type
                };

                result.Add(productDomain);
            }

            return result;
        } 
    }
}

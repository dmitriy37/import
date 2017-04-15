﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication2
{
    class TransactionScript
    {
        public void SetRecognitionByContract(int contractId)
        {
            using (var db = new TestEntities())
            {
                var contract = db.contracts.Find(contractId);
                var productId = contract.product;

                var product = db.products.Find(productId);
                var productType = product.type;

                var revenue = contract.revenue;
                var amount = revenue/3;
                var dateTimeNow = DateTime.Now;

                if (productType == "word processor")
                {
                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow
                    });
                }
                else if (productType == "spreadsheed")
                {
                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow
                    });

                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow.AddDays(+30)
                    });

                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow.AddDays(+60)
                    });
                }
                else if (productType == "databases")
                {
                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow
                    });

                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow.AddDays(+60)
                    });

                    db.revenueRecognitions.Add(new revenueRecognitions
                    {
                        contract = contractId,
                        amount = amount,
                        recognizedOn = dateTimeNow.AddDays(+90)
                    });
                }

                db.SaveChanges();
            }
        }
    }
}

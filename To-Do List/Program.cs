using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // This is a list to store my monthly expenses as pairs (description, cost)
        List<(string, double)> expenses = new List<(string, double)>();

        // enter your salary here
        Console.Write("Enter your salary: ");
        double income = double.Parse(Console.ReadLine());

        // this is while Loop that allows me enter new expense items until i type 'done'
        while (true)
        {
            Console.Write("Enter expense name (or 'done'): ");
            string item = Console.ReadLine();
            if (item.ToLower() == "done") break;

            Console.Write($"Enter cost for {item}: ");
            double cost = double.Parse(Console.ReadLine());

            // This adds the expense item to list
            expenses.Add((item, cost)); 
        }

        // This calculates the total expenses
        double totalExpenses = 0;
        foreach (var exp in expenses)
            totalExpenses += exp.Item2;

        // This calculates the remaining balance
        double balance = income - totalExpenses;

        // Print summary
        Console.WriteLine("\nSummary:");
        foreach (var exp in expenses)
            Console.WriteLine($"{exp.Item1}: ${exp.Item2}");
        Console.WriteLine($"Total Expenses: ${totalExpenses}");
        Console.WriteLine($"Remaining Balance: ${balance}");
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Monthly_Expense_Tracker
{
    public partial class Form1 : Form
    {
        // saves salary
        private double salary = 0;

        // saves expenses
        private List<(string, double)> expenses = new List<(string, double)>();


        public Form1()
        {
            InitializeComponent();
        }


        private void btnSetSalary_Click(object sender, EventArgs e)
        {
            // this will extract the salary from textbox
            if (double.TryParse(txtSalary.Text, out double value))
            {
                salary = value;
                lblSalaryValue.Text = $"Salary: ${salary}";
            }
            else
            {
                MessageBox.Show("Please enter a valid number for salary.");
            }

        }

        private void btnAddExpense_Click(object sender, EventArgs e)
        {
            // gets expense name
            string name = txtExpenseName.Text;

            // gets expense cost
            if (double.TryParse(txtExpenseCost.Text, out double cost))
            {
                expenses.Add((name, cost));
                lstExpenses.Items.Add($"{name}: ${cost}");
                UpdateSummary();
            }
            else
            {
                MessageBox.Show("Please enter a valid number for expense cost.");
            }

        }

            //gets the sum of expenses and the salary balance
            private void UpdateSummary()
        {
            double totalExpenses = expenses.Sum(exp => exp.Item2);
            double balance = salary - totalExpenses;

            lblTotal.Text = $"Total Expenses: ${totalExpenses}";
            lblBalance.Text = $"Remaining Balance: ${balance}";
        }


    }

}


namespace Monthly_Expense_Tracker
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnSetSalary = new System.Windows.Forms.Button();
            this.btnAddExpense = new System.Windows.Forms.Button();
            this.lblSalary = new System.Windows.Forms.Label();
            this.lblExpenseName = new System.Windows.Forms.Label();
            this.txtSalary = new System.Windows.Forms.TextBox();
            this.txtExpenseName = new System.Windows.Forms.TextBox();
            this.lblExpenseCost = new System.Windows.Forms.Label();
            this.txtExpenseCost = new System.Windows.Forms.TextBox();
            this.lstExpenses = new System.Windows.Forms.ListBox();
            this.lblTotal = new System.Windows.Forms.Label();
            this.lblBalance = new System.Windows.Forms.Label();
            this.lblSalaryValue = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnSetSalary
            // 
            this.btnSetSalary.Location = new System.Drawing.Point(636, 54);
            this.btnSetSalary.Name = "btnSetSalary";
            this.btnSetSalary.Size = new System.Drawing.Size(107, 33);
            this.btnSetSalary.TabIndex = 0;
            this.btnSetSalary.Text = "Set Salary";
            this.btnSetSalary.UseVisualStyleBackColor = true;
            this.btnSetSalary.Click += new System.EventHandler(this.btnSetSalary_Click);
            // 
            // btnAddExpense
            // 
            this.btnAddExpense.Location = new System.Drawing.Point(636, 141);
            this.btnAddExpense.Name = "btnAddExpense";
            this.btnAddExpense.Size = new System.Drawing.Size(107, 33);
            this.btnAddExpense.TabIndex = 0;
            this.btnAddExpense.Text = "Add Expense";
            this.btnAddExpense.UseVisualStyleBackColor = true;
            this.btnAddExpense.Click += new System.EventHandler(this.btnAddExpense_Click);
            // 
            // lblSalary
            // 
            this.lblSalary.AutoSize = true;
            this.lblSalary.Location = new System.Drawing.Point(95, 62);
            this.lblSalary.Name = "lblSalary";
            this.lblSalary.Size = new System.Drawing.Size(49, 16);
            this.lblSalary.TabIndex = 1;
            this.lblSalary.Text = "Salary:";
            // 
            // lblExpenseName
            // 
            this.lblExpenseName.AutoSize = true;
            this.lblExpenseName.Location = new System.Drawing.Point(41, 149);
            this.lblExpenseName.Name = "lblExpenseName";
            this.lblExpenseName.Size = new System.Drawing.Size(103, 16);
            this.lblExpenseName.TabIndex = 1;
            this.lblExpenseName.Text = "Expense Name:";
            // 
            // txtSalary
            // 
            this.txtSalary.Location = new System.Drawing.Point(150, 54);
            this.txtSalary.Multiline = true;
            this.txtSalary.Name = "txtSalary";
            this.txtSalary.Size = new System.Drawing.Size(392, 33);
            this.txtSalary.TabIndex = 2;
            // 
            // txtExpenseName
            // 
            this.txtExpenseName.Location = new System.Drawing.Point(150, 141);
            this.txtExpenseName.Multiline = true;
            this.txtExpenseName.Name = "txtExpenseName";
            this.txtExpenseName.Size = new System.Drawing.Size(213, 33);
            this.txtExpenseName.TabIndex = 2;
            // 
            // lblExpenseCost
            // 
            this.lblExpenseCost.AutoSize = true;
            this.lblExpenseCost.Location = new System.Drawing.Point(392, 149);
            this.lblExpenseCost.Name = "lblExpenseCost";
            this.lblExpenseCost.Size = new System.Drawing.Size(37, 16);
            this.lblExpenseCost.TabIndex = 1;
            this.lblExpenseCost.Text = "Cost:";
            // 
            // txtExpenseCost
            // 
            this.txtExpenseCost.Location = new System.Drawing.Point(435, 141);
            this.txtExpenseCost.Multiline = true;
            this.txtExpenseCost.Name = "txtExpenseCost";
            this.txtExpenseCost.Size = new System.Drawing.Size(107, 33);
            this.txtExpenseCost.TabIndex = 2;
            // 
            // lstExpenses
            // 
            this.lstExpenses.FormattingEnabled = true;
            this.lstExpenses.ItemHeight = 16;
            this.lstExpenses.Location = new System.Drawing.Point(150, 213);
            this.lstExpenses.Name = "lstExpenses";
            this.lstExpenses.Size = new System.Drawing.Size(310, 260);
            this.lstExpenses.TabIndex = 3;
            // 
            // lblTotal
            // 
            this.lblTotal.AutoSize = true;
            this.lblTotal.Location = new System.Drawing.Point(517, 257);
            this.lblTotal.Name = "lblTotal";
            this.lblTotal.Size = new System.Drawing.Size(41, 16);
            this.lblTotal.TabIndex = 4;
            this.lblTotal.Text = "Total:";
            // 
            // lblBalance
            // 
            this.lblBalance.AutoSize = true;
            this.lblBalance.Location = new System.Drawing.Point(498, 382);
            this.lblBalance.Name = "lblBalance";
            this.lblBalance.Size = new System.Drawing.Size(60, 16);
            this.lblBalance.TabIndex = 4;
            this.lblBalance.Text = "Balance:";
            // 
            // lblSalaryValue
            // 
            this.lblSalaryValue.AutoSize = true;
            this.lblSalaryValue.Location = new System.Drawing.Point(95, 108);
            this.lblSalaryValue.Name = "lblSalaryValue";
            this.lblSalaryValue.Size = new System.Drawing.Size(46, 16);
            this.lblSalaryValue.TabIndex = 5;
            this.lblSalaryValue.Text = "Salary";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 586);
            this.Controls.Add(this.lblSalaryValue);
            this.Controls.Add(this.lblBalance);
            this.Controls.Add(this.lblTotal);
            this.Controls.Add(this.lstExpenses);
            this.Controls.Add(this.txtExpenseCost);
            this.Controls.Add(this.txtExpenseName);
            this.Controls.Add(this.txtSalary);
            this.Controls.Add(this.lblExpenseCost);
            this.Controls.Add(this.lblExpenseName);
            this.Controls.Add(this.lblSalary);
            this.Controls.Add(this.btnAddExpense);
            this.Controls.Add(this.btnSetSalary);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnSetSalary;
        private System.Windows.Forms.Button btnAddExpense;
        private System.Windows.Forms.Label lblSalary;
        private System.Windows.Forms.Label lblExpenseName;
        private System.Windows.Forms.TextBox txtSalary;
        private System.Windows.Forms.TextBox txtExpenseName;
        private System.Windows.Forms.Label lblExpenseCost;
        private System.Windows.Forms.TextBox txtExpenseCost;
        private System.Windows.Forms.ListBox lstExpenses;
        private System.Windows.Forms.Label lblTotal;
        private System.Windows.Forms.Label lblBalance;
        private System.Windows.Forms.Label lblSalaryValue;
    }
}


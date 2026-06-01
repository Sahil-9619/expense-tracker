$replacements = [ordered]@{
  'System Configuration' = 'Settings';
  'Node Protocol Parameters' = 'Manage Your Account';
  'Identity Designation' = 'Full Name';
  'Communication Link' = 'Email Address';
  'Commit Protocol' = 'Save Changes';
  'Security Matrix' = 'Security Settings';
  'Active Defenses' = 'Security Status';
  'Cryptographic Key' = 'Password';
  'Resource Billing' = 'Billing & Plan';
  'Developer Access' = 'Developer API';
  'Purge Protocol' = 'Delete Account';
  'Irreversibly destruct all node data and terminate connection to the mainframe.' = 'Permanently delete your account and all data. This action cannot be undone.';
  'Initiate Purge' = 'Delete Account';
  'Logout Session' = 'Logout';
  'PRO ACCESS' = 'PRO MEMBER';
  'Protocol Ledger' = 'Transactions';
  'Sequence of financial operations' = 'Your recent transactions and history';
  'Export Audit' = 'Export Data';
  'New Sequence' = 'Add Transaction';
  'Search Terminal' = 'Search';
  'Query protocol...' = 'Search transactions...';
  'High Magnitude' = 'High Amount';
  'Income Nodes' = 'Income Only';
  'Expense Strings' = 'Expenses Only';
  'Pending Sync' = 'Pending';
  'Node Sync Status' = 'Sync Status';
  'cryptographically verified and synced with primary nodes' = 'saved and synced securely';
  'Timestamp / Merchant' = 'Date / Merchant';
  'Category Hub' = 'Category';
  'Magnitude (INR)' = 'Amount (INR)';
  'Zero Sequences Detected' = 'No transactions found';
  'Audit complete.' = 'Sync complete.';
  'records active.' = 'transactions found.';
  'Real-time liquidity monitoring' = 'Real-time financial overview';
  'Micro KPIs' = 'Key Metrics';
  'Protocol Bridge' = 'Quick Transfer';
  'From Liquidity Node' = 'From Wallet';
  'To Capital Hub' = 'To Goal';
  'Recent Ledger Entries' = 'Recent Transactions';
  'Filter Protocols' = 'Filter';
  'Awaiting system input...' = 'No transactions found.';
  'vs last epoch' = 'vs last month';
  'No wallet or goal assets stored' = 'No wallets or goals found';
  'Liquidity Nodes' = 'Wallets';
  'Capital reservoirs and sync status' = 'Manage your accounts and balances';
  'Distributed capital architecture' = 'Manage your accounts and balances';
  'Connect Node' = 'Add Wallet';
  'No liquidity nodes connected' = 'No wallets connected';
  'Add Terminal' = 'Add Wallet';
  'Verified Liquidity Node:' = 'Wallet ID:';
  'Node Analytics' = 'Wallet Analytics';
  'Node Stability' = 'Wallet Status';
  'Recent Node Activity' = 'Recent Wallet Activity';
  'User-scoped database sync active' = 'All data is saved and synced securely';
  'Sync Protocol' = 'Sync Now';
  'Intelligence Archive' = 'Reports';
  'Synthesized data structures' = 'Generated financial reports';
  'Generate Intelligence' = 'Generate Report';
  'Data Vaults' = 'Report Folders';
  'Initialize New Vault' = 'Create Folder';
  'Vault Contents' = 'Folder Contents';
  'No intelligence synthesized' = 'No reports generated yet';
  'Initialize Generation' = 'Create Report';
  'Extract Data' = 'Download Report';
  'Purge Document' = 'Delete Report';
  'Primary Node' = 'Primary Account'
}

Get-ChildItem -Path d:\expense-tracker\frontend\src -Filter *.jsx -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    if ($content -cne $original) {
        Set-Content -Path $_.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($_.FullName)"
    }
}
Write-Host "Done!"

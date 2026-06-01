$replacements = [ordered]@{
  'Protocol Intelligence' = 'Analytics';
  'Deep neural financial audit' = 'Detailed financial insights';
  'Historical Epoch' = 'Select Date Range';
  'Export Intelligence' = 'Export Data';
  'Live Inflow Feed' = 'Live Data Feed';
  'Liquidity Trajectory' = 'Spending Trends';
  'Capital Flux Map' = 'Cash Flow Chart';
  'Node Vitals' = 'Key Metrics';
  'Growth Index' = 'Growth Rate';
  'Wallet Nodes' = 'Wallets';
  'Capital Optimization Active' = 'Premium Active';
  'Classification Resource Mapping' = 'Spending by Category';

  'Support Intelligence' = 'Help & Support';
  'Master node operations and protocol master' = 'Get help with your account';
  'Terminal Knowledge Hub' = 'Help Center';
  'EST_SESSION_ID' = 'SESSION_ID';
  'Welcome to the Intelligence Terminal. Query our knowledge nodes to optimize your financial protocols.' = 'Welcome to the Help Center. Search for answers or browse our guides to learn more.';
  'Initialize onboarding protocol' = 'Get started with your account';
  'Check document integrity' = 'Verify your documents';
  'Force node synchronization' = 'Force data sync';
  'Recalibrate protocol profile' = 'Reset your profile settings';
  'Frequently Queried Protocols' = 'Frequently Asked Questions';
  'Automated Liquidity Syncing' = 'Automated syncing';
  'Encrypted Document Hash Verification' = 'Document security';
  'Multi-Node Data Redundancy' = 'Data backup and safety';
  'Enter command or search query...' = 'Search for help...';
  'Global Support Nodes' = 'Support Channels';
  'Hardware Support' = 'System Support';
  'System Core' = 'System Core';
  'Region Hubs' = 'Servers';
  'Human Intelligence' = 'Contact Support';
  'Priority encrypted communication' = 'Get help from a real person';
  'Connect to Agent' = 'Chat with Support';

  'Capital Thresholds' = 'Budgets';
  'Real-time expenditure containment' = 'Manage your spending limits';
  'Initialize Limit' = 'Create Budget';
  'Threshold Breaches' = 'Over Budget Alerts';
  'No threshold alerts from database' = 'No budget alerts';
  'Saving Momentum' = 'Total Savings';
  'Saved from active records' = 'Total money saved';
  'Expenditure Meters' = 'Budget Tracking';
  'Protocol Classification' = 'Category';
  'CONTAINMENT BREACHED' = 'OVER LIMIT';
  'NOMINAL RANGE' = 'UNDER LIMIT';
  'No budget thresholds stored' = 'No budgets found';

  'Capital Objectives' = 'Financial Goals';
  'Phase-based wealth accumulation' = 'Track your savings goals';
  'Initialize Phase' = 'Create Goal';
  'Phase Distribution' = 'Goal Progress';
  'No Objectives' = 'No Goals';
  'Hall of Achievement' = 'Completed Goals';
  'Nodes Completed' = 'Goals Completed';
  'No objectives stored' = 'No goals found';
  'Phase Completion' = 'Progress';
  'Initialize New Phase' = 'Create New Goal';
  'Secured' = 'Completed'
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

//SwaggerAutoLaunch.cs, self explanatory

namespace TestApp.Extensions
{
    public static class SwaggerAutoLauncher
    {
        public static void Open(string swaggerUrl)
        {
            try
            {
                _ = Task.Run(async () =>
                {
                    await Task.Delay(2000); // Give Kestrel time to start
                    try
                    {
                        var psi = new System.Diagnostics.ProcessStartInfo
                        {
                            FileName = swaggerUrl,
                            UseShellExecute = true
                        };
                        System.Diagnostics.Process.Start(psi);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to open Swagger automatically: {ex.Message}");
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error scheduling Swagger launch: {ex.Message}");
            }
        }
    }
}

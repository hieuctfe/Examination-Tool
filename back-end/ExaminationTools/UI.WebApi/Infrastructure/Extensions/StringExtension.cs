namespace UI.WebApi.Infrastructure.Extensions
{
    using System;
    
    public static class StringExtension
    {
        public static string UniqueFileName(this string fileName, Func<string, bool> isExisted)
        {
            int counter = 0;
            int fileExtPos = fileName.LastIndexOf(".", StringComparison.Ordinal);

            string finalName = null;
            string fileNameWithoutExtension = fileName.Substring(0, fileExtPos);
            string ext = fileName.Substring(fileExtPos);
            do
            {
                finalName = fileNameWithoutExtension;

                finalName = counter++ == 0 ?
                    $"{finalName}{ext}" :
                    $"{finalName}({counter - 1}){ext}";
            } while (isExisted.Invoke(finalName));
            return $"{finalName}";
        }
    }
}
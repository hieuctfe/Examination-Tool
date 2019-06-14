namespace UI.WebApi.Infrastructure.Extensions
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Collections.Generic;
    using System.Reflection;

    public static class LinqExtension
    {
        public enum OrderBy
        {
            Ascending = 0,
            Descending = 1
        }

        static PropertyInfo FindPropertyInfo(Type type, string propertyName)
        {
            PropertyInfo property = null;
            if (propertyName.Contains("."))
            {
                string[] nameParts = propertyName.Split('.');
                property = type.GetProperty(nameParts[0]);

                if (property != null)
                {
                    propertyName = propertyName.Substring(propertyName.IndexOf('.') + 1);
                    property = FindPropertyInfo(property.PropertyType, propertyName);
                }
            }
            else
            {
                property = type.GetProperty(propertyName);
            }
            return property;
        }

        public static IOrderedQueryable<T> OrderByPropertyName<T>(this IQueryable<T> list, string propertyName, OrderBy orderBy)
        {
            PropertyInfo property = null;
            if (string.IsNullOrEmpty(propertyName))
            {
                property = typeof(T).GetProperties()[0];
            }
            else
            {
                property = FindPropertyInfo(typeof(T), propertyName);
            };

            if (property == null)
            {
                throw new Exception("Property not existed");
            }

            ParameterExpression args = Expression.Parameter(typeof(T), "x");

            Expression argsProperty = null;
            if (!string.IsNullOrEmpty(propertyName))
            {
                if (propertyName.Contains("."))
                {
                    argsProperty = args;
                    foreach (var part in propertyName.Split('.'))
                    {
                        argsProperty = Expression.PropertyOrField(argsProperty, part);
                    }
                }
            }
            if (argsProperty == null)
            {
                argsProperty = Expression.MakeMemberAccess(args, property);
            }

            Type funcType = typeof(Func<,>).MakeGenericType(typeof(T), property.PropertyType);

            LambdaExpression expression = Expression.Lambda(
                delegateType: funcType,
                body: argsProperty,
                parameters: args
                );

            MethodInfo method = typeof(LinqExtension).GetMethod(
                orderBy == OrderBy.Ascending ? "Ascending" : "Descending",
                BindingFlags.Static | BindingFlags.NonPublic);

            return (IOrderedQueryable<T>)method.MakeGenericMethod(typeof(T), argsProperty.Type)
                    .Invoke(null, new object[] { list, expression });
        }

        private static IOrderedQueryable<T> Ascending<T, U>(IQueryable<T> list, Expression<Func<T, U>> expression)
            => list.OrderBy(expression);

        private static IOrderedQueryable<T> Descending<T, U>(IQueryable<T> list, Expression<Func<T, U>> expression)
            => list.OrderByDescending(expression);
    }
}
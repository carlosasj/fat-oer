How to use i18n
---------------

create a html element that has a data-i18n attribute like so:

```html
<p data-i18n="paragraph-text">This text does not matter and will only show up if the user can't run js</p>
```

now add a tag corresponting to the data-i18n attribute on every Messages_*.properties

Messages_en.properties
```
paragraph-text = This text will be shown instead
```

Messages_pt.properties
```
paragraph-text = Esse texto será mostrado
```

the Messages.properties file is a fallback if the selected language does not exist



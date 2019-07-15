## Libraries
library(tidyverse)
## Plotting
read.csv("cafeina2.csv") %>%
  mutate(is_coffee = (Drink=="Coffee")) %>%
  ggplot(aes(x=reorder(Drink, ml),
             y=ml, fill=is_coffee)) + 
  geom_col() + 
  scale_fill_manual(values=c("Black","Red")) +
  labs(x="Bebida", y="Quantidade em ml") +
  theme(legend.position = "none") +
  coord_flip()













































































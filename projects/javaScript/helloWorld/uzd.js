let i = 0;
let sum = 0;

sum = sum + i; //i=0 ,sum=0
i = i + 1; //i=1, sum=0
sum = sum + i; //i=1 sum=1
i++; //i=2
sum = sum + i; //sum=1+2=3

sum = sum + i; //3+2=5
i++; //i=3
sum = sum + i;
i++;
sum = sum + i;
i++;

//arba tas pats
while (i < 10) {
  sum = sum + i;
  i++;
}

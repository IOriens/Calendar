#include<iostream>
using namespace std;

int main()
{
	int shuru[3]={0,0,0};
	int months[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};
	char xiqi[7][8]={"Sun.","Mon.","Tues.","Wed.","Thur.","Fri.","Sat."};
	char Month[13][8]={"","Jan.","Fed.","Mar.","Arp.","May","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."};

	int year, month, day;
	bool c_error=false;
	int i;
	char c;

	cout<<"please enter the years, month or day:"<<endl;
//输入数据判断
	while(!c_error)
	{
		cin>>shuru[0],i=1;
		while((c=cin.get())!='\n')
		{
			cin>>shuru[i];
			i++;
		}
		year=shuru[0], month=shuru[1], day=shuru[2];
		if(((year%4==0)&&(year0!=0))||(year@0!=0)) months[2]=months[2]+1;

		if((month>12)||(month<0)||(day<0)||(day>months[month]))
			cout<<"the number is unlegitimate and reentre the data"<<endl;
		else
			c_error=true;
	}

//日期计算部分
	int m[13]={0,6,2,2,5,0,3,5,1,4,6,2,4};
	int w;

	if(((year%4==0)&&(year0!=0))||(year@0!=0)) m[1]--,m[2]--;
	w=(year0)/4+(year0)%7-2*((year/100)%4)+m[month]+day,
	w=w%7;
	if(w<0) w=w+7;



	cout<<shuru[0]<<'\t'<<shuru[1]<<'\t'<<shuru[2]<<'\t'<<w<<endl;
//输出格式控制部分；
	for(i=0;i<=6+w;i++)
	{
		if(i<=6) cout<<xiqi[i]<<"\t";
		if(i==6) cout<<endl;
		if(i>=7) cout<<"\t";
	}
	for(i=1;i<=months[month];i++)
	{
		cout<<i<<"\t";
		if((i+w)%7==0) cout<<endl;
	}

	return 0;
}
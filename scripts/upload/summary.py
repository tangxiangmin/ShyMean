#coding=utf-8
import sys
import pyhanlp

text = sys.argv[1]
#summary = pyhanlp.HanLP.extractSummary(text, 3)
summary = pyhanlp.HanLP.extractKeyword(text, 4)

print(summary)
